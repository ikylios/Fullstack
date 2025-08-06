const { DataTypes } = require("sequelize")

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("readinglists", {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "blogs", key: "id" },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
      },
    })
    await queryInterface.addColumn("blogs", "read", {
      type: DataTypes.BOOLEAN,
      default: false,
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("readinglists")
    await queryInterface.removeColumn("read", "blogs")
  },
}
