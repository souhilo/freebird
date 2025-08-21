import { accountService } from "@/lib/services/account.service";
import { validateRequest } from "@/lib/validate-request";
import Joi from "joi";
import { NextRequest, NextResponse } from "next/server";

export async function OPTIONS() {
  return NextResponse.json(null, { status: 200 });
}

export async function POST(req: NextRequest) {
  const ip = req.ip ?? "";
  const token = req.cookies.get("refreshToken")?.value || "";

  const result = await accountService.refreshToken({ token, ipAddress: ip });

  if (result instanceof NextResponse) {
    return result;
  }

  const data = result;

  return NextResponse.json(data);
}
