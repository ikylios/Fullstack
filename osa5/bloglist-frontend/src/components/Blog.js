import React from 'react'
const Blog = ({ blog, addLike }) => (
  <div>
    {blog.title} {blog.author} likes:{blog.likes} <button onClick={() => addLike(blog)}>like!</button>
  </div>
)

export default Blog
