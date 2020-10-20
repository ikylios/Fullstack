import React from 'react'
import PropTypes from 'prop-types'


const Blog = ({ blog, addLike, deleteBlog, username }) => {
  const visibleRemoveButton = { display: blog.userId.username === username ? '' : 'none' }

  return (
    <div>
      {blog.title}  {blog.author} likes:{blog.likes}
      <button onClick={() => addLike(blog)}>like!</button>
      <div style={visibleRemoveButton}>
        <button onClick={() => deleteBlog(blog)}>remove</button>
      </div>
    </div>
  )}

Blog.displayName = 'Blog'
Blog.propTypes = {
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}

export default Blog
