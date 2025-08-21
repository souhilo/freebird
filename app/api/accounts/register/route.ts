import { accountService } from "@/lib/services/account.service";
import { NextRequest, NextResponse } from "next/server";

export async function OPTIONS() {
  return NextResponse.json(null, { status: 200 });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  await accountService.register(body, req.headers.get("origin") || "");
  return NextResponse.json({
    message:
      "Registration successful, please check your email for verification instructions",
  });
}
