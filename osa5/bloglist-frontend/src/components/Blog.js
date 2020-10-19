import React from 'react'
const Blog = ({ blog, addLike, deleteBlog, userId }) => {
    const ownBlog = blog.userId === userId
    const visibleRemoveButton= { display: ownBlog ? 'none' : ''}

  return (
    <div>
    {blog.title}  {blog.author} likes:{blog.likes} 
    <button onClick={() => addLike(blog)}>like!</button>
    <div style={visibleRemoveButton}>
      <button onClick={() => deleteBlog(blog)}>remove</button>
    </div>
  </div>
)}

export default Blog
