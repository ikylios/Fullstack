const router = require("express").Router()
const { Blog } = require("../models")
const { User } = require("../models")
const { Op } = require("sequelize")
const { tokenExtractor, validateSession } = require("../util/auth")

router.get("/", async (req, res) => {
  let fields = {}
  if (req.query.search) {
    fields = {
      [Op.or]: [
        { author: { [Op.iLike]: `%${req.query.search}%` } },
        { title: { [Op.iLike]: `%${req.query.search}%` } },
      ],
    }
  }

  try {
    const blogs = await Blog.findAll({
      attributes: {
        exclude: ["userId"],
      },
      include: {
        model: User,
        attributes: ["name"],
      },
      where: fields,
      order: [["likes", "DESC"]],
    })

    console.log(JSON.stringify(blogs, null, 2))
    res.json(blogs)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.post("/", tokenExtractor, validateSession, async (req, res, next) => {
  try {
    console.log("decoded token id:", req.decodedToken.id)
    const user = await User.findByPk(req.decodedToken.id)
    console.log("User found:", user)
    const blog = await Blog.create({
      ...req.body,
      userId: user.id,
      read: false,
    })
    console.log(JSON.stringify(blog, null, 2))
    return res.json(blog)
  } catch (error) {
    next(error)
  }
})

router.delete(
  "/:id",
  tokenExtractor,
  validateSession,
  async (req, res, next) => {
    try {
      const blog = await Blog.findOne({ where: { id: req.params.id } })
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
  }
)

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
