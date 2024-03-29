import { useState } from "react"
import { gql, useMutation, useSubscription } from "@apollo/client"

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      published
      title
      genres
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {
        name
      }
    }
  }
`

const NewBook = ({ show }) => {
  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      window.alert(
        `A new book was added: ${data.data.bookAdded.title} by ${data.data.bookAdded.author.name}`
      )
    },
  })

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [published, setPublished] = useState(0)
  const [genre, setGenre] = useState("")
  const [genres, setGenres] = useState([])

  const [addBook, addBookResult] = useMutation(ADD_BOOK, {})

  const submit = async (event) => {
    event.preventDefault()

    addBook({ variables: { title, author, published, genres } })

    setTitle("")
    setPublished("")
    setAuthor("")
    setGenres([])
    setGenre("")
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre("")
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(parseInt(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
