import { DataTypes, Sequelize } from "sequelize";

export function candidatureModel(sequelize: Sequelize) {
  return sequelize.define("candidature", {
    created: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated: { type: DataTypes.DATEONLY },
    month: { type: DataTypes.INTEGER },
    year: { type: DataTypes.INTEGER },
    status: { type: DataTypes.STRING },
    mention: { type: DataTypes.STRING },
    designation: { type: DataTypes.STRING, allowNull: false },
    nom: { type: DataTypes.STRING, allowNull: false },
    prenom: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    pays: { type: DataTypes.STRING, allowNull: false },
    ville: { type: DataTypes.STRING },
    poste: { type: DataTypes.STRING, allowNull: false },
    cv: { type: DataTypes.STRING, allowNull: false },
    mobilite_geographique: { type: DataTypes.STRING },
    disponibilite: { type: DataTypes.STRING },
    origine: { type: DataTypes.STRING },
  });
}
