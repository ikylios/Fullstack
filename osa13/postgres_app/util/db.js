const { Sequelize } = require("sequelize")
const { DATABASE_URL } = require("./config")
const sequelize = new Sequelize(DATABASE_URL)

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log("Connection has been established successfully.")
    /*
    const blogs = await sequelize.query("SELECT * FROM blogs", {
      type: QueryTypes.SELECT,
    })
    console.log("blogs:")
    blogs.map((blog) => {
      console.log(`${blog.author}: ${blog.title}, ${blog.likes} likes`)
    })
		*/
  } catch (error) {
    console.error("Unable to connect to the database:", error)
  }
  return null
}

module.exports = {
  connectToDatabase,
  sequelize,
}
