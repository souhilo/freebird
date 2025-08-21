import { DataTypes, Sequelize } from "sequelize";

export function refreshTokenModel(sequelize: Sequelize) {
  return sequelize.define(
    "refreshToken",
    {
      token: { type: DataTypes.STRING },
      expires: { type: DataTypes.DATE },
      created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      createdByIp: { type: DataTypes.STRING },
      revoked: { type: DataTypes.DATE },
      revokedByIp: { type: DataTypes.STRING },
      replacedByToken: { type: DataTypes.STRING },
      isExpired: {
        type: DataTypes.VIRTUAL,
        get() {
          return Date.now() >= this.getDataValue("expires");
        },
      },
      isActive: {
        type: DataTypes.VIRTUAL,
        get() {
          return (
            !this.getDataValue("revoked") && !this.getDataValue("isExpired")
          );
        },
      },
    },
    { timestamps: false }
  );
}
