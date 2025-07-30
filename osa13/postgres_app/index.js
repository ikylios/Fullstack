require("dotenv").config()
const { Sequelize, QueryTypes, Model, DataTypes } = require("sequelize")
const express = require("express")
const sequelize = new Sequelize(process.env.DATABASE_URL)

const app = express()

app.use(express.static("dist"))
app.use(express.json())

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

class Blog extends Model {}

Blog.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    author: { type: DataTypes.TEXT },
    url: { type: DataTypes.TEXT, allowNull: false },
    title: { type: DataTypes.TEXT, allowNull: false },
    likes: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  { sequelize, underscored: true, timestamps: false, modelName: "blog" }
)

const main = async () => {
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
}

main()

app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.findAll()
    console.log(JSON.stringify(blogs, null, 2))
    res.json(blogs)
  } catch (error) {
    res.status(400).json({ error })
  }
})

app.post("/api/blogs", async (req, res) => {
  try {
    console.log(req.body)
    const blog = await Blog.create(req.body)
    console.log(JSON.stringify(blog, null, 2))
    return res.json(blog)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

app.delete("/api/blogs/:id", async (req, res) => {
  try {
    console.log(req.params)
    await Blog.destroy({ where: { id: req.params.id } })
    return res.status(204).end()
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error })
  }
})
