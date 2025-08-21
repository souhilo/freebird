import { authorize } from "@/lib/authorize";
import { candidatureService } from "@/lib/services/candidature.service";
import { NextRequest, NextResponse } from "next/server";

export async function OPTIONS() {
  return NextResponse.json(null, { status: 200 });
}

export async function POST(req: NextRequest, { params }: any) {
  await authorize(req);
  const body = await req.json();
  const stats = await candidatureService.getStats(body.poste);
  return NextResponse.json(stats);
}
