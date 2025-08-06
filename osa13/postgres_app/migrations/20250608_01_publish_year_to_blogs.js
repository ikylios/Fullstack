const { DataTypes } = require("sequelize")

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("blogs", "publish_year", {
      type: DataTypes.INTEGER,
      default: 1991,
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("blogs", "publish_year")
  },
}
