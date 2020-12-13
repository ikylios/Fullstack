import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import UsersInfo from './components/UsersInfo'
import Togglable from './components/Togglable'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notifReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()
  const blogRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort(function(a, b) {
        return b.likes - a.likes
      })))
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
          <div>username <input id="username" value={username} onChange={ ({ target }) => setUsername(target.value)}/></div>
          <div>password <input id="password" value={password} onChange={ ({ target }) => setPassword(target.value)}/></div>
          <button id="login-button" type="submit">login</button>
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
      dispatch(setNotification('wrong username or password', 5))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }


  const handleNewBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    const response = await blogService.create(newBlog)
    setBlogs(blogs.concat(response))
    console.log('blogs after new blog:', blogs)
  }

  const addLike = async (blog) => {
    const blogId = blog.id
    const oldBlog = blogs.find(b => b.id === blogId)
    oldBlog.likes = oldBlog.likes + 1
    const updatedBlog = oldBlog

    const response = await blogService.like(updatedBlog)
    setBlogs(blogs.map(blog => blog.id !== blogId ? blog: response))
    setBlogs(blogs.sort(function(a, b) {
      return b.likes - a.likes
    }))
  }

  const deleteBlog = async (blog) => {
    await blogService.deleteBlog(blog.id)
    setBlogs(blogs.filter(b => b.id !== blog.id))
  }


  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm
        handleNewBlog={handleNewBlog} />
    </Togglable>
  )

  const blogList = () => {
    return (
      <div>
        <h2>blogs</h2>
        {blogForm()}
        {blogs.map(blog =>
          <Blog id='blog' key={blog.id} blog={blog} addLike={addLike} deleteBlog={deleteBlog} username={user.name} ref={blogRef}/>
        )}
      </div>
    )
  }

  const Menu = () => {
    const padding = {
      paddingRight: 5,
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 5,
      backgroundColor: 'lightgray'
    }
    
    return (
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        <span style={padding}> {user.name} logged in</span>
          <button type="submit" onClick={handleLogout}>logout</button>
      </div>
    )
  }
  
  
  return(
    <div>
      <Router>
        { user === null ? null : Menu() }
        <Notification />
        
        <Switch>

          <Route path="/users">
            <UsersInfo />
          </Route>
          <Route path="/">
            {user === null ?
              LoginForm() :
              blogList()
            }
          </Route>
        </Switch>
        
      </Router> 
    </div>
  )
}

export default App