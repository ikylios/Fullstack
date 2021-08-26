import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql, useQuery } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born 
      bookCount 
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks{
      title 
      author 
      published 
    }
  }
`


const App = () => {
  const result = useQuery(ALL_AUTHORS)
  const bookResult = useQuery(ALL_BOOKS)
  const [page, setPage] = useState('authors')

  if (result.loading || bookResult.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'} authors={result.data.allAuthors}
      />

      <Books
        show={page === 'books'} books={bookResult.data.allBooks}
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App