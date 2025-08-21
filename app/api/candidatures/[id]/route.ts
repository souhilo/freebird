import { authorize } from "@/lib/authorize";
import { candidatureService } from "@/lib/services/candidature.service";
import { validateRequest } from "@/lib/validate-request";
import Joi from "joi";
import { NextRequest, NextResponse } from "next/server";

export async function OPTIONS() {
  return NextResponse.json(null, { status: 200 });
}

export async function GET(req: NextRequest, { params }: any) {
  await authorize(req);
  const data = await candidatureService.getById(params.id);
  return data
    ? NextResponse.json(data)
    : NextResponse.json({}, { status: 404 });
}

export async function PUT(req: NextRequest, { params }: any) {
  await authorize(req);
  const schema = Joi.object({
    status: Joi.string(),
    mention: Joi.string(),
    designation: Joi.string().required(),
    nom: Joi.string().required(),
    prenom: Joi.string().required(),
    email: Joi.string().required(),
    pays: Joi.string().required(),
    ville: Joi.string(),
    poste: Joi.string().required(),
    cv: Joi.string().required(),
    mobilite_geographique: Joi.string(),
    disponibilite: Joi.string(),
    origine: Joi.string(),
  });
  const body = validateRequest(await req.json(), schema);
  const updated = await candidatureService.update(params.id, body);
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: any) {
  await authorize(req, ["Admin"]);
  await candidatureService.delete(params.id);
  return NextResponse.json({ message: "Candidature deleted successfully" });
}
