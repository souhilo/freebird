import { NextRequest, NextResponse } from "next/server";
import { authorize } from "@/lib/authorize";
import { validateRequest } from "@/lib/validate-request";
import { offreService } from "@/lib/services/offre.service";
import Joi from "joi";

export async function OPTIONS() {
  return NextResponse.json(null, { status: 200 });
}

export async function GET() {
  const data = await offreService.getAll();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
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

  const created = await offreService.create(body);

  return NextResponse.json(created);
}
