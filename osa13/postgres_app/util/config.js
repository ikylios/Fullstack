require("dotenv").config()

const PORT = process.env.PORT || 3001
const DATABASE_URL = process.env.DATABASE_URL
const SECRET = "pöö"

module.exports = {
  PORT,
  DATABASE_URL,
  SECRET,
}
