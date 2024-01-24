const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")

const { v1: uuid } = require("uuid")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
require("dotenv").config()

const Book = require("./models/book")
const Author = require("./models/author")
const User = require("./models/user")

const { authors, books } = require("./constants")

const MONGODB_URI = process.env.MONGODB_URI
console.log("connecting to", MONGODB_URI)

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message)
  })

const typeDefs = `
  type Author {
    name: String!
    id: ID!
    born: Int 
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    me: (root, args, context) => context.currentUser,
    allAuthors: async () => await Author.find({}),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return await Book.find({}).populate("author")
      }
      if (args.author && args.genre) {
        return await Book.find(
          { author: { name: args.author } },
          { genre: { $in: args.genres } }
        ).populate("author")
      }
      if (!args.author && args.genre) {
        return await Book.find({
          genres: { genre: { $in: args.genres } },
        }).populate("author")
      }
      if (args.author && !args.genre) {
        return await Book.find({ author: { name: args.author } }).populate(
          "author"
        )
      }
    },
  },

  Author: {
    name: (root) => root.name,
    bookCount: async (root) =>
      await Book.find({ author: root }).countDocuments(),
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const newAuthor = new Author({
        name: args.author,
        born: null,
        id: uuid(),
      })

      if (context.currentUser) {
        const foundAuthor = await Author.findOne({ name: newAuthor.name })
        if (!foundAuthor) {
          newAuthor.save()
        }

        const newBook = new Book({ ...args, author: newAuthor })
        return newBook.save()
      }
    },
    editAuthor: async (root, args, context) => {
      console.log("context", context)
      if (context.currentUser) {
        const author = await Author.findOne({ name: args.name })
        author.born = args.setBornTo
        return author.save()
      }
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })
      return user.save()
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { token: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
