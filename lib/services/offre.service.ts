export const offreService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};
import { db, initDb } from "@/lib/db";

function basicDetails(o: any) {
  const {
    id,
    status,
    title,
    publicationDate,
    expirationDate,
    nature,
    type_contrat,
    pays,
    wilaya,
    email_destinataire,
    jobTitle,
    jobDescription,
    requiredProfile,
    autre,
  } = o;
  return {
    id,
    status,
    title,
    publicationDate,
    expirationDate,
    nature,
    type_contrat,
    pays,
    wilaya,
    email_destinataire,
    jobTitle,
    jobDescription,
    requiredProfile,
    autre,
  };
}

async function getAll() {
  await initDb();
  const rows = await db.Offre.findAll();
  return rows.map((x: any) => basicDetails(x));
}

async function getById(id: string) {
  await initDb();
  const o = await db.Offre.findByPk(id);
  if (!o) throw new Error("Offre not found");
  return basicDetails(o);
}

async function create(params: any) {
  await initDb();
  const o = new db.Offre(params);
  await o.save();
  return basicDetails(o);
}

async function update(id: string, params: any) {
  await initDb();
  const o = await db.Offre.findByPk(id);
  if (!o) throw new Error("Offre not found");
  Object.assign(o, params);
  o.updated = Date.now();
  await o.save();
  return basicDetails(o);
}

async function _delete(id: string) {
  await initDb();
  const o = await db.Offre.findByPk(id);
  if (!o) throw new Error("Offre not found");
  await o.destroy();
}
