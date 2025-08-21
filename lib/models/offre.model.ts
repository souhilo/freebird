import { DataTypes, Sequelize } from "sequelize";

export function offreModel(sequelize: Sequelize) {
  return sequelize.define("offre", {
    created: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated: { type: DataTypes.DATEONLY },
    status: { type: DataTypes.STRING },
    title: { type: DataTypes.STRING, allowNull: false },
    publicationDate: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
    expirationDate: { type: DataTypes.DATEONLY },
    nature: { type: DataTypes.STRING, allowNull: false },
    type_contrat: { type: DataTypes.STRING },
    pays: { type: DataTypes.STRING },
    wilaya: { type: DataTypes.STRING, allowNull: false },
    email_destinataire: { type: DataTypes.STRING },
    jobTitle: { type: DataTypes.STRING, allowNull: false },
    jobDescription: { type: DataTypes.TEXT, allowNull: false },
    requiredProfile: { type: DataTypes.TEXT },
    autre: { type: DataTypes.TEXT },
  });
}
