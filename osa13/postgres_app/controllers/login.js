const jwt = require("jsonwebtoken")
const router = require("express").Router()

const { SECRET } = require("../util/config")
const { User, Session } = require("../models")

router.post("/login", async (request, response) => {
  const body = request.body

  const user = await User.findOne({
    where: {
      username: body.username,
    },
  })

  const passwordCorrect = body.password === "salainen"

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    })
  }

  if (user.disabled) {
    return response.status(401).json({
      error: "user has been disabled",
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  await Session.create({
    userId: user.id,
    token: token,
  })

  response.status(200).send({ token, username: user.username, name: user.name })
})

router.delete("/logout", async (request, response) => {
  const token = request.headers.authorization?.replace("Bearer ", "")
  console.log("token", token)

  const session = await Session.findOne({
    where: { token: token },
  })

  if (!session) {
    return response.status(401).json({ error: "session not found" })
  }

  await session.destroy()

  response.status(204).end()
})

module.exports = router
