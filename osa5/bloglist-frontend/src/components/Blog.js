import React from 'react'
import PropTypes from 'prop-types'
import Togglable from './Togglable'


const Blog = React.forwardRef(({ blog, addLike, deleteBlog, username }, ref) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const visibleRemoveButton = { display: blog.userId.username === username ? '' : 'none' }

  return (
    <div style={blogStyle}>
      {blog.title}  {blog.author}
      <Togglable buttonLabel='view' ref={ref}>
        url:{blog.url}<br></br>
        likes:{blog.likes}
        <button onClick={() => addLike(blog)}>like!</button>
        <div style={visibleRemoveButton}>
          <button onClick={() => deleteBlog(blog)}>remove</button>
        </div>
      </Togglable>
    </div>
  )})

Blog.displayName = 'Blog'
Blog.propTypes = {
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}

export default Blog
