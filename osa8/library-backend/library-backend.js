const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const { v1: uuid } = require("uuid");
const mongoose = require("mongoose");

const Book = require("./models/book");
const Author = require("./models/author");

const { authors, books } = require("./constants");

const MONGODB_URI =
  "mongodb+srv://kayttis:salis@cluster0.lk93mmd.mongodb.net/?retryWrites=true&w=majority";

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

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

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]
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
  }
`;
const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allAuthors: async () => await Author.find({}),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return await Book.find({}).populate("author");
      }
      if (args.author && args.genre) {
        return await Book.find(
          { author: { name: args.author } },
          { genre: { $in: args.genres } }
        ).populate("author");
      }
      if (!args.author && args.genre) {
        return await Book.find({
          genres: { genre: { $in: args.genres } },
        }).populate("author");
      }
      if (args.author && !args.genre) {
        return await Book.find({ author: { name: args.author } }).populate(
          "author"
        );
      }
    },
  },

  Author: {
    name: (root) => root.name,
    bookCount: async (root) =>
      await Book.find({ author: root }).countDocuments(),
  },

  Mutation: {
    addBook: async (root, args) => {
      const newAuthor = new Author({
        name: args.author,
        born: null,
        id: uuid(),
      });
      console.log("newAuthor", newAuthor);

      const foundAuthor = await Author.findOne({ name: newAuthor.name });
      console.log("foundAuthor", foundAuthor);
      if (!foundAuthor) {
        newAuthor.save();
      }

      const newBook = new Book({ ...args, author: newAuthor });
      return newBook.save();
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name });
      author.born = args.setBornTo;
      return author.save();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
