import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    handleNewBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div> title: <input id='title' value={title} onChange={ ({ target }) => setTitle(target.value)}/></div>
        <div> author: <input id='author' value={author} onChange={ ({ target }) => setAuthor(target.value)}/></div>
        <div> url: <input id='url' value={url} onChange={ ({ target }) => setUrl(target.value)}/></div>
        <button id="createBlog-button" type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.displayName = 'BlogForm'
BlogForm.propTypes = {
  handleNewBlog: PropTypes.func.isRequired
}

export default BlogForm
