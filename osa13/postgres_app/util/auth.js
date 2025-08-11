const jwt = require("jsonwebtoken")
const { SECRET } = require("../util/config")

const { Session, User } = require("../models")

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

const validateSession = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "")
  if (!token) {
    return res.status(401).json({ error: "token missing" })
  }

  try {
    const session = await Session.findOne({ where: { token } })
    if (!session) {
      return res.status(401).json({ error: "session not found" })
    }
    const user = await User.findOne({ where: { id: session.userId } })
    if (user.disabled) {
      return res.status(401).json({ error: "user has been disabled" })
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { tokenExtractor, validateSession }
