import { useEffect } from "react"
import { gql, useQuery } from "@apollo/client"
import { ALL_BOOKS } from "./Books"

export const MY_FAV_GENRE = gql`
  query myFavGenre {
    me {
      favoriteGenre
    }
  }
`

const Recommendations = (props) => {
  const { loading: meLoading, data: meData } = useQuery(MY_FAV_GENRE)

  const {
    loading: bookLoading,
    data: bookData,
    refetch: bookRefetch,
  } = useQuery(ALL_BOOKS, {
    variables: { genre: meData?.me?.favoriteGenre ?? null },
  })

  useEffect(() => {
    if (meData) {
      bookRefetch()
    }
  }, [meData])

  if (!props.show) {
    return null
  }

  if (bookLoading || meLoading) {
    return <div>loading...</div>
  }

  const books = bookData?.allBooks ?? []

  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre <b>{meData?.me?.favoriteGenre}</b>
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

export default Recommendations
