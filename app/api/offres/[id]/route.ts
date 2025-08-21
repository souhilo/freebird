import { authorize } from "@/lib/authorize";
import { offreService } from "@/lib/services/offre.service";
import { validateRequest } from "@/lib/validate-request";
import Joi from "joi";
import { NextRequest, NextResponse } from "next/server";

export async function OPTIONS() {
  return NextResponse.json(null, { status: 200 });
}

export async function GET(req: NextRequest, { params }: any) {
  const data = await offreService.getById(params.id);
  return data
    ? NextResponse.json(data)
    : NextResponse.json({}, { status: 404 });
}

export async function PUT(req: NextRequest, { params }: any) {
  await authorize(req);
  const schema = Joi.object({
    status: Joi.string(),
    title: Joi.string().required(),
    publicationDate: Joi.date().iso(),
    expirationDate: Joi.date().iso(),
    nature: Joi.string().required(),
    type_contrat: Joi.string(),
    pays: Joi.string(),
    wilaya: Joi.string().required(),
    email_destinataire: Joi.string().allow("").optional(),
    jobTitle: Joi.string().required(),
    jobDescription: Joi.string().required(),
    requiredProfile: Joi.string(),
    autre: Joi.string().allow("").optional(),
  });
  const body = validateRequest(await req.json(), schema);
  const updated = await offreService.update(params.id, body);

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: any) {
  await authorize(req, ["Admin"]);
  await offreService.delete(params.id);
  return NextResponse.json({ message: "Offre deleted successfully" });
}
