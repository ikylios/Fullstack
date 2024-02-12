import { useState } from "react"
import { gql, useQuery } from "@apollo/client"

export const ALL_GENRES = gql`
  query {
    allGenres
  }
`

export const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      genres
      author {
        name
      }
    }
  }
`

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState("all genres")
  const {
    loading: bookLoading,
    data: bookData,
    refetch: bookRefetch,
  } = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre !== "all genres" ? selectedGenre : null },
  })

  const { loading: genreLoading, data: genreData } = useQuery(ALL_GENRES)

  const changeGenre = (genre) => {
    bookRefetch()
    setSelectedGenre(genre)
  }

  if (!props.show) {
    return null
  }

  if (bookLoading || genreLoading) {
    return <div>loading...</div>
  }

  const books = bookData?.allBooks ?? []

  return (
    <div>
      <h2>books</h2>

      {genreData.allGenres.map((genre) => (
        <button key={genre} onClick={() => changeGenre(genre)}>
          {genre}
        </button>
      ))}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
