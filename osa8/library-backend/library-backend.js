const { ApolloServer } = require("@apollo/server")

const { expressMiddleware } = require("@apollo/server/express4")
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer")
const { makeExecutableSchema } = require("@graphql-tools/schema")
const express = require("express")
const cors = require("cors")
const http = require("http")
const { PubSub } = require("graphql-subscriptions")
const pubsub = new PubSub()

const { WebSocketServer } = require("ws")
const { useServer } = require("graphql-ws/lib/use/ws")

const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
require("dotenv").config()

const Book = require("./models/book")
const Author = require("./models/author")
const User = require("./models/user")

//const { authors, books } = require("./constants")

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
    allBooks(genre: String): [Book!]
    allGenres: [String!]
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

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    me: (_root, _args, context) => context.currentUser,
    allAuthors: async () => await Author.find({}),
    allGenres: async () => {
      const books = await Book.find({})
      const genresByBook = books.map((book) => book.genres).flat()
      const genres = genresByBook
        .filter((genre, index) => genresByBook.indexOf(genre) === index)
        .concat("all genres")
        .sort()

      return genres
    },
    allBooks: async (_root, args) => {
      if (args.genre) {
        return await Book.find({ genres: { $all: args.genre } }).populate(
          "author"
        )
      }
      return await Book.find({}).populate("author")
    },
  },

  Author: {
    name: (root) => root.name,
    bookCount: async (root) =>
      await Book.find({ author: root }).countDocuments(),
  },

  Mutation: {
    addBook: async (_root, args, context) => {
      const newAuthor = new Author({
        name: args.author,
        born: null,
      })

      if (context.currentUser) {
        const foundAuthor = await Author.findOne({ name: newAuthor.name })
        if (!foundAuthor) {
          newAuthor.save()
        } else {
          const newBook = new Book({ ...args, author: foundAuthor })
          return newBook.save()
        }

        const newBook = new Book({ ...args, author: newAuthor })
        pubsub.publish("BOOK_ADDED", { bookAdded: newBook })
        return newBook.save()
      }
    },
    editAuthor: async (_root, args, context) => {
      if (context.currentUser) {
        const author = await Author.findOne({ name: args.name })
        author.born = args.setBornTo
        return author.save()
      }
    },
    createUser: async (_root, args) => {
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

      const token = { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
      return token
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
}

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/apollographql",
  })

  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  await server.start()

  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith("Bearer ")) {
          const decodedToken = jwt.verify(
            auth.substring(7),
            process.env.JWT_SECRET
          )
          const currentUser = await User.findById(decodedToken.id)
          return { currentUser }
        }
      },
    })
  )

  const PORT = 4000

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  )
}

start()
