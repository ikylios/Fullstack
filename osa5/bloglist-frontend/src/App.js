import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const LoginForm = () => {
    return (
      <div>
        <h2>login to app</h2>
          <form onSubmit={handleLogin}>
            <div>username <input value={username} onChange={ ({ target }) => setUsername(target.value)}/></div>
            <div>password <input value={password} onChange={ ({ target }) => setPassword(target.value)}/></div>
            <button type="submit">login</button>
          </form>
      </div>
    )
  }
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('eror')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
      setUser(null)
      /*
      user = await loginService.logout({
        username, password
      })
      */
      window.localStorage.removeItem('loggedUser')
  }

  const BlogForm = () => {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={handleNewBlog}>
          <div> title: <input value={title} onChange={ ({ target }) => setTitle(target.value)}/></div>
          <div> author: <input value={author} onChange={ ({ target }) => setAuthor(target.value)}/></div>
          <div> url: <input value={url} onChange={ ({ target }) => setUrl(target.value)}/></div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    const response = await blogService.create(newBlog)
    setBlogs(blogs.concat(response))
  }

  const blogList = () => {
    return (
     <div>
        <p>{user.name} logged in</p>
        <button type="submit" onClick={handleLogout}>logout</button>
        <h2>blogs</h2>
        {BlogForm()}
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
     </div>
    )
  }

  return (
    <div>
      {user === null ? 
         LoginForm() : 
         blogList() 
      } 

    </div>
  )
}

export default App