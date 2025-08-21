import { NextRequest, NextResponse } from "next/server";
import { authorize } from "@/lib/authorize";
import { validateRequest } from "@/lib/validate-request";
import { candidatureService } from "@/lib/services/candidature.service";
import Joi from "joi";

export async function OPTIONS() {
  return NextResponse.json(null, { status: 200 });
}

export async function GET(req: NextRequest) {
  await authorize(req);
  const data = await candidatureService.getAll();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  // Create
  const formData = await req.formData();
  const file = formData.get("cv_file") as File;

  if (!file || !file.name) {
    return NextResponse.json(
      { message: "Validation error", errors: "CV file is required" },
      { status: 400 }
    );
  }

  const allowedExt = [".pdf", ".doc", ".docx"];
  const ext = file.name.substring(file.name.lastIndexOf("."));
  if (!allowedExt.includes(ext.toLowerCase())) {
    return NextResponse.json(
      { message: "Validation error", errors: "Invalid file type" },
      { status: 400 }
    );
  }

  const buffer = new Uint8Array(await file.arrayBuffer());
  const name = `${Date.now()}-${file.name}`;
  const fs = await import("fs/promises");
  await fs.writeFile(`./public/uploads/${name}`, buffer);
  const now = new Date();
  const body: any = {
    ...Object.fromEntries(formData.entries()),
    poste: formData.get("poste_hidden") || formData.get("poste"),
    origine: formData.get("origine_candidature"),
    status: "nouvelle",
    cv: `/uploads/${name}`,
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  };

  delete body.poste_hidden;
  delete body.cv_file;
  delete body.origine_candidature;

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
    disponibilite: Joi.string().required().disallow(""),
    origine: Joi.string(),
    month: Joi.number().required(),
    year: Joi.number().required(),
  });

  const validateReq = validateRequest(body, schema);

  if (validateReq instanceof NextResponse) {
    return validateReq;
  }

  const validatedReq = validateReq;

  const created = await candidatureService.create(validatedReq);

  return NextResponse.json(created);
}
