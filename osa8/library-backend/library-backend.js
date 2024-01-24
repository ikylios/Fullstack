const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')

const Book = require('./models/book')
const Author = require('./models/author')
const author = require('./models/author')

const MONGODB_URI = 'mongodb+srv://kayttis:salis@cluster0.lk93mmd.mongodb.net/?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Reijo Mäki', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
  {
    title: 'Pimeyden tango',
    published: 1997,
    author: 'Reijo Mäki',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['crime']
  },
]

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
`
const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) =>  {

      if (!args.author && !args.genre) {
        return await Book.find({}).populate('author')
      }
      if (args.author && args.genre) {
        return await Book.find({ author: { name: args.author }}, { genre: { $in: args.genres }}).populate('author')
      }
      if (!args.author && args.genre) {
        return await Book.find({ genres: { genre: {$in: args.genres }}}).populate('author')
      }
      if (args.author && !args.genre) {
        return await Book.find({ author: { name: args.author }}).populate('author')
      }
      
    }, 
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: async () => await Author.find({})
  },
  
  Author: {
    name: (root) => root.name,
    bookCount: async (root) => {
      
      return await Book.find({ 'author.name': root.name }).populate('author').then(b => console.log(b))
      
//      const r = await Book.find({ author: { name: root.name }})
//      console.log(r)
//      return await Book.find({ author: { name: root.name }}).countDocuments()
//      */
    } //    bookCount: (root) => 3
  },
  
  Mutation: {
    addBook: (root, args) => {
      const author = new Author({name: args.author, id: uuid()}) 
      const newBook = new Book({...args, author: author})
      books = books.concat(newBook)
      if (!authors.includes(author)) {
        authors = authors.concat(author)
        author.save()
      }
      return newBook.save()
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name }) 
      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })        
      }
    }
  }
}

/* alkuperäinen koodi
const resolvers = {
  Query: {
    bookCount: () => books.length,
    allBooks: (root, args) =>  {
      if (!args.author && !args.genre) {
        return books
      }
      if (args.author && args.genre) {
        return books.filter(b => b.author === args.author).filter(b => b.genres.includes(args.genre))
      }
      if (!args.author && args.genre) {
        return books.filter(b => b.genres.includes(args.genre))
      }
      if (args.author && !args.genre) {
        return books.filter(b => b.author === args.author)
      }      
    },
    authorCount: () => authors.length,
    allAuthors: () => authors 
  },
  
  Author: {
    name: (root) => root.name,
    bookCount: (root) => books.filter(b => b.author === root.name).length
  },
*/

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

