const express = require("express")
const app = express()

const { PORT } = require("./util/config")
const { connectToDatabase } = require("./util/db")
const { errorHandler } = require("./util/errorhandler")

const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const { Blog, ReadingList } = require("./models")

app.use(express.json())
app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

app.get("/api/authors", async (req, res, next) => {
  if (req.query.search) {
    fields = {}
  }

  try {
    const agg = await Blog.findAll({
      group: "author",
      attributes: [
        "author",
        [Blog.sequelize.fn("COUNT", Blog.sequelize.col("id")), "blogs"],
        [Blog.sequelize.fn("SUM", Blog.sequelize.col("likes")), "likes"],
      ],
    })
    console.log(JSON.stringify(agg, null, 2))
    res.json(agg)
  } catch (error) {
    next(error)
  }
})

app.post("/api/readinglists", async (req, res, next) => {
  try {
    const entry = await ReadingList.create({
      userId: req.body.user_id,
      blogId: req.body.blog_id,
    })
    console.log(JSON.stringify(entry, null, 2))
    return res.json(entry)
  } catch (error) {
    next(error)
  }
})

app.use(errorHandler)
const startServer = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

startServer()
