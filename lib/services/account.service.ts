export const accountService = {
  authenticate,
  refreshToken,
  revokeToken,
  register,
  verifyEmail,
  forgotPassword,
  validateResetToken,
  resetPassword,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};
import { db, initDb } from "../db";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendEmail } from "@/lib/send-email";
import { NextResponse } from "next/server";

function generateJwtToken(account: any) {
  return jwt.sign(
    { sub: account.id, id: account.id, role: account.role },
    process.env.SECRET!,
    {
      expiresIn: "12h",
    }
  );
}

function randomTokenString() {
  return crypto.randomBytes(40).toString("hex");
}

async function authenticate({
  email,
  password,
  ipAddress,
}: {
  email: string;
  password: string;
  ipAddress: string;
}) {
  await initDb();
  const acc = await db.Account.scope("withHash").findOne({ where: { email } });
  if (
    !acc ||
    !acc.isVerified ||
    !(await bcrypt.compare(password, acc.passwordHash))
  )
    return NextResponse.json(
      { message: "Email or password is incorrect" },
      { status: 400 }
    );
  const jwtToken = generateJwtToken(acc);
  const refresh = new db.RefreshToken({
    accountId: acc.id,
    token: randomTokenString(),
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdByIp: ipAddress,
  });
  await refresh.save();
  return { ...basicDetails(acc), jwtToken, refreshToken: refresh.token };
}
async function refreshToken({
  token,
  ipAddress,
}: {
  token: string;
  ipAddress: string;
}) {
  await initDb();
  const current = await db.RefreshToken.findOne({ where: { token } });
  if (!current || !current.isActive)
    return NextResponse.json({ message: "Invalid token" }, { status: 400 });

  const account = await current.getAccount();
  const newToken = new db.RefreshToken({
    accountId: account.id,
    token: randomTokenString(),
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdByIp: ipAddress,
  });
  current.revoked = Date.now();
  current.revokedByIp = ipAddress;
  current.replacedByToken = newToken.token;
  await current.save();
  await newToken.save();
  const jwtToken = generateJwtToken(account);
  return { ...basicDetails(account), jwtToken, refreshToken: newToken.token };
}

async function revokeToken({
  token,
  ipAddress,
}: {
  token: string;
  ipAddress: string;
}) {
  await initDb();
  const current = await db.RefreshToken.findOne({ where: { token } });
  if (!current || !current.isActive) throw new Error("Invalid token");
  current.revoked = Date.now();
  current.revokedByIp = ipAddress;
  await current.save();
}

async function register(params: any, origin: string) {
  await initDb();
  if (await db.Account.findOne({ where: { email: params.email } })) {
    await sendAlreadyRegisteredEmail(params.email, origin);
    return;
  }
  const account = new db.Account(params);
  const isFirst = (await db.Account.count()) === 0;
  account.role = isFirst ? "Admin" : "User";
  account.verificationToken = randomTokenString();
  account.passwordHash = await bcrypt.hash(params.password, 10);
  await account.save();
  await sendVerificationEmail(account, origin);
}

async function verifyEmail({ token }: { token: string }) {
  await initDb();
  const account = await db.Account.findOne({
    where: { verificationToken: token },
  });
  if (!account)
    return NextResponse.json(
      { message: "Verification failed" },
      { status: 400 }
    );
  account.verified = Date.now();
  account.verificationToken = null;
  await account.save();
}

async function forgotPassword({ email }: { email: string }, origin: string) {
  await initDb();
  const account = await db.Account.findOne({ where: { email } });
  if (!account) return;
  account.resetToken = randomTokenString();
  account.resetTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  await account.save();
  await sendPasswordResetEmail(account, origin);
}

async function validateResetToken({ token }: { token: string }) {
  await initDb();
  const account = await db.Account.findOne({
    where: {
      resetToken: token,
      resetTokenExpires: { [db.Sequelize.Op.gt]: Date.now() },
    },
  });

  if (!account)
    return NextResponse.json({ message: "Invalid token" }, { status: 400 });

  return account;
}

async function resetPassword({
  token,
  password,
}: {
  token: string;
  password: string;
}) {
  const result = await validateResetToken({ token });

  if (result instanceof NextResponse) {
    return result;
  }

  const account = result;

  account.passwordHash = await bcrypt.hash(password, 10);
  account.passwordReset = Date.now();
  account.resetToken = null;
  await account.save();
}

async function getAll() {
  await initDb();
  const accounts = await db.Account.findAll();
  return accounts.map((a: any) => basicDetails(a));
}

async function getById(id: string) {
  const acc = await getAccount(id);
  return basicDetails(acc);
}

async function create(params: any) {
  await initDb();
  if (await db.Account.findOne({ where: { email: params.email } }))
    throw new Error(`Email "${params.email}" is already registered`);
  const account = new db.Account(params);
  account.verified = Date.now();
  account.acceptTerms = true;
  account.passwordHash = await bcrypt.hash(params.password, 10);
  await account.save();
  return basicDetails(account);
}

async function update(id: string, params: any) {
  const acc = await getAccount(id);
  if (
    params.email &&
    acc.email !== params.email &&
    (await db.Account.findOne({ where: { email: params.email } }))
  )
    throw new Error(`Email "${params.email}" is already taken`);
  if (params.password)
    params.passwordHash = await bcrypt.hash(params.password, 10);
  Object.assign(acc, params);
  acc.updated = Date.now();
  await acc.save();
  return basicDetails(acc);
}

async function _delete(id: string) {
  const acc = await getAccount(id);
  await acc.destroy();
}

async function getAccount(id: string) {
  await initDb();
  const acc = await db.Account.findByPk(id);
  if (!acc) throw new Error("Account not found");
  return acc;
}

async function sendVerificationEmail(account: any, origin: string) {
  const verifyUrl = origin
    ? `${origin}/account/verify-email?token=${account.verificationToken}`
    : account.verificationToken;
  await sendEmail({
    to: account.email,
    subject: "Verify Email",
    html: `<p>Please verify:</p><p>${verifyUrl}</p>`,
  });
}

async function sendAlreadyRegisteredEmail(email: string, origin: string) {
  const msg = origin
    ? `<p>If you don't know your password please visit the forgot password page.</p>`
    : `<p>If you don't know your password you can reset it.</p>`;
  await sendEmail({
    to: email,
    subject: "Email Already Registered",
    html: `<h4>Email Already Registered</h4><p>Your email <strong>${email}</strong> is already registered.</p>${msg}`,
  });
}

async function sendPasswordResetEmail(account: any, origin: string) {
  const resetUrl = origin
    ? `${origin}/account/reset-password?token=${account.resetToken}`
    : account.resetToken;
  await sendEmail({
    to: account.email,
    subject: "Reset Password",
    html: `<p>Reset your password:</p><p>${resetUrl}</p>`,
  });
}

function basicDetails(account: any) {
  return {
    id: account.id,
    title: account.title,
    firstName: account.firstName,
    lastName: account.lastName,
    email: account.email,
    role: account.role,
    created: account.created,
    updated: account.updated,
    isVerified: account.isVerified,
  };
}
