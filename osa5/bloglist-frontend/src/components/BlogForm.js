import React, {useState} from 'react'


  const BlogForm = ({ handleNewBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const createBlog = (event) => {
        console.log('entered create')
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
            <div> title: <input value={title} onChange={ ({ target }) => setTitle(target.value)}/></div>
            <div> author: <input value={author} onChange={ ({ target }) => setAuthor(target.value)}/></div>
            <div> url: <input value={url} onChange={ ({ target }) => setUrl(target.value)}/></div>
            <button type="submit">create</button>
          </form>
        </div>
    )
  }


  export default BlogForm