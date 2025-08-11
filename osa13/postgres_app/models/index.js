const Blog = require("./blog")
const User = require("./user")
const Session = require("./session")
const ReadingList = require("./readinglist")

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, {
  through: ReadingList,
  as: "readings",
})
Blog.belongsToMany(User, {
  through: ReadingList,
})

//Blog.sync({ alter: true })
//User.sync({ alter: true })

User.hasMany(Session)
Session.belongsTo(User)

module.exports = {
  Blog,
  User,
  Session,
  ReadingList,
}
