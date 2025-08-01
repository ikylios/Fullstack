const { Sequelize } = require("sequelize")
const { DATABASE_URL } = require("./config")
const sequelize = new Sequelize(DATABASE_URL)

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log("Connection has been established successfully.")
  } catch (error) {
    console.error("Unable to connect to the database:", error)
  }
  return null
}

module.exports = {
  connectToDatabase,
  sequelize,
}
