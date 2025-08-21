import { authorize } from "@/lib/authorize";
import { accountService } from "@/lib/services/account.service";
import { validateRequest } from "@/lib/validate-request";
import Joi from "joi";
import { NextRequest, NextResponse } from "next/server";

export async function OPTIONS() {
  return NextResponse.json(null, { status: 200 });
}

export async function GET(req: NextRequest, { params }: any) {
  const result = await authorize(req, ["Admin"]);

  if (result instanceof NextResponse) {
    return result;
  }

  const data = await accountService.getById(params.id);

  return NextResponse.json(data);
}

export async function PUT(req: NextRequest, { params }: any) {
  const result = await authorize(req);

  if (result instanceof NextResponse) {
    return result;
  }

  const user = result;

  const schema = Joi.object({
    title: Joi.string(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(6),
    confirmPassword: Joi.string().valid(Joi.ref("password")),
    role: Joi.string().valid("Admin", "User"),
  });

  const body = validateRequest(await req.json(), schema);

  if (user.id !== params.id && user.role !== "Admin")
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const updated = await accountService.update(params.id, body);

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: any) {
  const result = await authorize(req, ["Admin"]);

  if (result instanceof NextResponse) {
    return result;
  }

  await accountService.delete(params.id);

  return NextResponse.json({ message: "Account deleted successfully" });
}
