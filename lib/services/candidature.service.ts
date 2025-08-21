export const candidatureService = {
  getStats,
  getAll,
  getAllStatus,
  getById,
  create,
  update,
  delete: _delete,
};
import { initDb, db } from "@/lib/db";
import { Op } from "sequelize";

function basicDetails(cand: any) {
  const {
    id,
    created,
    updated,
    status,
    mention,
    designation,
    nom,
    prenom,
    email,
    pays,
    ville,
    poste,
    cv,
    mobilite_geographique,
    disponibilite,
    origine,
  } = cand;
  return {
    id,
    created,
    updated,
    status,
    mention,
    designation,
    nom,
    prenom,
    email,
    pays,
    ville,
    poste,
    cv,
    mobilite_geographique,
    disponibilite,
    origine,
  };
}

async function getStats(poste: string) {
  await initDb();
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const res: any = {};
  for (const m of months) {
    res[m] = await db.Candidature.count({
      where: {
        month: { [Op.eq]: m },
        year: { [Op.eq]: 2022 },
        ...(poste !== "all" ? { poste: { [Op.eq]: poste } } : {}),
      },
    });
  }
  return res;
}

async function getAll() {
  await initDb();
  const rows = await db.Candidature.findAll();
  return rows.map((x: any) => basicDetails(x));
}

async function getAllStatus(status: string) {
  await initDb();
  const rows = await db.Candidature.findAll({ where: { status } });
  return rows.map((x: any) => basicDetails(x));
}

async function getById(id: string) {
  await initDb();
  const c = await db.Candidature.findByPk(id);
  if (!c) throw new Error("Candidature not found");
  return basicDetails(c);
}

async function create(params: any) {
  await initDb();
  const rec = new db.Candidature(params);
  await rec.save();
  return basicDetails(rec);
}

async function update(id: string, params: any) {
  await initDb();
  const c = await db.Candidature.findByPk(id);
  if (!c) throw new Error("Candidature not found");
  Object.assign(c, params);
  c.updated = Date.now();
  await c.save();
  return basicDetails(c);
}

async function _delete(id: string) {
  await initDb();
  const c = await db.Candidature.findByPk(id);
  if (!c) throw new Error("Candidature not found");
  await c.destroy();
}
