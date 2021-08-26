import { useMutation, gql } from '@apollo/client'
import { ALL_AUTHORS } from '../App'
import React, { useState } from 'react'
  
const EDIT_BIRTHYEAR = gql `
  mutation editAuthor($name: String, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
    }
  }
`

const Authors = (props) => {
  const [author, setAuthor] = useState('')
  const [born, setBorn] = useState('')
  
  const [ editBirthyear ] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })
  
  if (!props.show) {
    return null
  }

  const authors = props.authors 

  const submit = async (event) => {
    event.preventDefault()
    
    editBirthyear({ variables: { name: author, setBornTo: parseInt(born) } })

    setAuthor('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name 
            <select onChange={({ target }) => setAuthor(target.value)}>
              {authors.map(a => 
                <option key={a.name} value={a.name}>{a.name}</option>
              )} 
            </select>
        </div>
        <div>
          born 
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>

    </div>
  )
}

export default Authors