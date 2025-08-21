import { NextRequest, NextResponse } from "next/server";
import YAML from "yamljs";

const swaggerDocument = YAML.load("./swagger.yaml");

export async function GET(req: NextRequest) {
  // Next.js can't serve swaggerUi directly; instead return the JSON
  return NextResponse.json(swaggerDocument);
}
