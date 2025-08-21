import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function authorize(request: NextRequest, roles: string[] = []) {
  const rawToken = request.headers.get("x-bearer-token");

  if (!rawToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let decoded: any;

  try {
    decoded = jwt.verify(rawToken, process.env.SECRET!);
  } catch (e) {
    console.log({ e });
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // If a role is required and doesn't match → throw Response (401)
  if (roles.length && !roles.includes(decoded.role)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return {
    id: decoded.id,
    role: decoded.role,
    ownsToken: (token: string) => {
      const tokensHeader = request.headers.get("x-user-refresh-tokens") || "[]";
      const tokens = JSON.parse(tokensHeader) as string[];
      return tokens.includes(token);
    },
  };
}
