import { accountService } from "@/lib/services/account.service";
import { NextRequest, NextResponse } from "next/server";

export async function OPTIONS() {
  return NextResponse.json(null, { status: 200 });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = await accountService.verifyEmail(body);

  if (result instanceof NextResponse) {
    return result;
  }

  return NextResponse.json({
    message: "Verification successful, you can now login",
  });
}
