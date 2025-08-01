const router = require("express").Router()

const { User } = require("../models")

router.get("/", async (req, res) => {
  const users = await User.findAll()
  res.json(users)
})

router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.put("/:username", async (req, res, next) => {
  try {
    await User.update(
      { name: req.body.name },
      { where: { username: req.params.username } }
    )
    return res.status(200).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router
