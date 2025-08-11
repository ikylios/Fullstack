const { Model, DataTypes } = require("sequelize")

const { sequelize } = require("../util/db")

class Session extends Model {}

Session.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
    sequelize,
    underscored: true,
    modelName: "activesession",
  }
)

module.exports = Session
