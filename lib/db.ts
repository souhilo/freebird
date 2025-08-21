import { Sequelize } from "sequelize";
import { accountModel } from "@/lib/models/account.model";
import { refreshTokenModel } from "@/lib/models/refresh-token.model";
import { candidatureModel } from "@/lib/models/candidature.model";
import { offreModel } from "@/lib/models/offre.model";
import mysql from "mysql2/promise";

let initialized = false;
let sequelize: Sequelize;
export const db: any = {};

export async function initDb() {
  if (initialized) return;

  // const { host, port, user, password, database } = config.database;

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT!),
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
  });

  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`
  );

  // Connect to DB

  sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT!),
      dialect: "mysql",
    }
  );

  db.Account = accountModel(sequelize);
  db.RefreshToken = refreshTokenModel(sequelize);
  db.Candidature = candidatureModel(sequelize);
  db.Offre = offreModel(sequelize);

  db.Account.hasMany(db.RefreshToken, { onDelete: "CASCADE" });
  db.RefreshToken.belongsTo(db.Account);

  await sequelize.sync();
  initialized = true;
}
