import { authorize } from "@/lib/authorize";
import { accountService } from "@/lib/services/account.service";
import { validateRequest } from "@/lib/validate-request";
import Joi from "joi";
import { NextRequest, NextResponse } from "next/server";

export async function OPTIONS() {
  return NextResponse.json(null, { status: 200 });
}

export async function POST(req: NextRequest) {
  const result = await authorize(req);

  if (result instanceof NextResponse) {
    return result;
  }

  const user = result;

  const schema = Joi.object({ token: Joi.string().allow("") });
  const body = validateRequest(await req.json(), schema);
  const token = body.token || req.cookies.get("refreshToken")?.value;

  if (!token)
    return NextResponse.json({ message: "Token is required" }, { status: 400 });

  if (!user.ownsToken(token) && user.role !== "Admin")
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  await accountService.revokeToken({ token, ipAddress: req.ip ?? "" });

  return NextResponse.json({ message: "Token revoked" });
}
