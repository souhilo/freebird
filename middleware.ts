import { NextRequest, NextResponse } from "next/server";

// Protect API and /uploads
export const config = {
  matcher: ["/api/:path*", "/uploads/:path*"],
};

export async function middleware(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");

  let token = authHeader;

  if (token && token?.startsWith("Bearer ")) {
    token = token.replace("Bearer ", "");
  }

  const requestHeaders = new Headers(req.headers);

  if (token) {
    console.log("Token middleware", token);
    requestHeaders.set("x-bearer-token", token);
  }

  // CORS and preflight
  const response = NextResponse.next({ request: { headers: requestHeaders } });

  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  response.headers.set("Access-Control-Allow-Credentials", "true");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return new NextResponse(null, { status: 204, headers: response.headers });
  }

  return response;
}
