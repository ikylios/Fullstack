const router = require("express").Router()
const { Blog } = require("../models")

router.get("/", async (req, res) => {
  console.log("dsfjkldsjfklds")
  try {
    const blogs = await Blog.findAll()
    console.log(JSON.stringify(blogs, null, 2))
    res.json(blogs)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body)
    const blog = await Blog.create(req.body)
    console.log(JSON.stringify(blog, null, 2))
    return res.json(blog)
  } catch (error) {
    next(error)
  }
})

router.delete("/:id", async (req, res) => {
  try {
    console.log(req.params)
    await Blog.destroy({ where: { id: req.params.id } })
    return res.status(204).end()
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error })
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
