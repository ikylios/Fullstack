import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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

  const blogList = () => {
    return (
     <div>
        <p>{user.name} logged in</p>
        <button type="submit" onClick={handleLogout}>logout</button>
        <h2>blogs</h2>
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