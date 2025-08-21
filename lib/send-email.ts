import nodemailer from "nodemailer";

export async function sendEmail({
  to,
  subject,
  html,
  from = process.env.emailFrom,
}: {
  to: string;
  subject: string;
  html: string;
  from?: string;
}) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT!),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  await transporter.sendMail({ from, to, subject, html });
}
