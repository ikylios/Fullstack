import { useState } from "react"

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState("all genres")

  if (!props.show) {
    return null
  }

  const books = props.books ?? []

  const genresByBook = books.map((book) => book.genres).flat()
  const genres = genresByBook
    .filter((genre, index) => genresByBook.indexOf(genre) === index)
    .concat("all genres")
    .sort()

  const filteredBooks =
    selectedGenre == "all genres"
      ? books
      : books.filter((book) => book.genres.includes(selectedGenre))

  return (
    <div>
      <h2>books</h2>

      {genres.map((genre) => (
        <button onClick={() => setSelectedGenre(genre)}>{genre}</button>
      ))}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((b) => (
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
