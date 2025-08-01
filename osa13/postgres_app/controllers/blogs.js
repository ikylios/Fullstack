const router = require("express").Router()
const { Blog } = require("../models")
const { User } = require("../models")

const jwt = require("jsonwebtoken")
const { SECRET } = require("../util/config")

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization")
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      console.log(authorization.substring(7))
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error) {
      console.log(error)
      return res.status(401).json({ error: "token invalid" })
    }
  } else {
    return res.status(401).json({ error: "token missing" })
  }
  next()
}

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.findAll()
    console.log(JSON.stringify(blogs, null, 2))
    res.json(blogs)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.post("/", tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({ ...req.body, userId: user.id })
    console.log(JSON.stringify(blog, null, 2))
    return res.json(blog)
  } catch (error) {
    next(error)
  }
})

router.delete("/:id", tokenExtractor, async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ where: { id: req.params.id } })
    console.log(blog.userId)
    console.log(req.decodedToken.id)
    if (blog.userId !== req.decodedToken.id) {
      return res
        .status(403)
        .json({ error: "Only allowed to delete own blogs." })
    }
    await blog.destroy({ where: { id: req.params.id } })
    return res.status(204).end()
  } catch (error) {
    next(error)
  }
})

router.put("/:id", async (req, res, next) => {
  try {
    await Blog.update(
      { likes: req.body.likes },
      { where: { id: req.params.id } }
    )
    return res.status(200).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router
