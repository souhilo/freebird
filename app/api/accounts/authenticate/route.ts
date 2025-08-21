import { accountService } from "@/lib/services/account.service";
import { validateRequest } from "@/lib/validate-request";
import Joi from "joi";
import { NextRequest, NextResponse } from "next/server";

export async function OPTIONS() {
  return NextResponse.json(null, { status: 200 });
}

export async function POST(req: NextRequest) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const body = validateRequest(await req.json(), schema);

  const { email, password } = body;
  const ip = req.ip ?? "";

  const result = await accountService.authenticate({
    email,
    password,
    ipAddress: ip,
  });

  if (result instanceof NextResponse) {
    return result;
  }

  const auth = result;

  return NextResponse.json(auth);
}
