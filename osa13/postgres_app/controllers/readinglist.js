const router = require("express").Router()
const { tokenExtractor } = require("../util/auth")
const { ReadingList } = require("../models")

router.post("/", async (req, res, next) => {
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

router.put("/:id", tokenExtractor, async (req, res, next) => {
  try {
    const entry = await ReadingList.findByPk(req.params.id)
    if (req.decodedToken.id !== entry.userId) {
      return res.status(403).json({ error: "Can only update own readinglist" })
    }
    await entry.update({ read: req.body.read })
    return res.status(200).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router
