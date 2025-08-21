import { authorize } from "@/lib/authorize";
import { candidatureService } from "@/lib/services/candidature.service";
import { NextRequest, NextResponse } from "next/server";

export async function OPTIONS() {
  return NextResponse.json(null, { status: 200 });
}

export async function GET(req: NextRequest, { params }: any) {
  authorize(req);
  const status = req.nextUrl.searchParams.get("status") || "";
  const data = await candidatureService.getAllStatus(status);
  return NextResponse.json(data);
}
