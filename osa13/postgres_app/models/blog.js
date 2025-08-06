const { Model, DataTypes } = require("sequelize")
const { sequelize } = require("../util/db")

class Blog extends Model {}

Blog.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    author: { type: DataTypes.TEXT },
    url: { type: DataTypes.TEXT, allowNull: false },
    title: { type: DataTypes.TEXT, allowNull: false },
    likes: { type: DataTypes.INTEGER, defaultValue: 0 },
    publishYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1991,
      validate: {
        max: new Date().getFullYear(),
        min: 1991,
      },
    },
  },
  { sequelize, underscored: true, timestamps: false, modelName: "blog" }
)

module.exports = Blog
