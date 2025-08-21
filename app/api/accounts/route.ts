import { NextRequest, NextResponse } from "next/server";
import { authorize } from "@/lib/authorize";
import { validateRequest } from "@/lib/validate-request";
import { accountService } from "@/lib/services/account.service";
import Joi from "joi";

export async function OPTIONS() {
  return NextResponse.json(null, { status: 200 });
}

export async function POST(req: NextRequest) {
  // Create account
  const result = await authorize(req, ["Admin"]);

  if (result instanceof NextResponse) {
    return result;
  }

  const schema = Joi.object({
    title: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
    role: Joi.string().valid("Admin", "User").required(),
  });

  const body = validateRequest(await req.json(), schema);
  const acc = await accountService.create(body);
  return NextResponse.json(acc);
}

export async function GET(req: NextRequest) {
  const result = await authorize(req, ["Admin"]);

  if (result instanceof NextResponse) {
    return result;
  }

  const data = await accountService.getAll();

  return NextResponse.json(data);
}
