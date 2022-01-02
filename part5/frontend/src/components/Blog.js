import React from 'react'
const Blog = ({blog}) => (
  <div>
    <p>Title: {blog.title}</p>
    <p>Author: {blog.author}</p>
    <hr />
  </div>  
)

export default Blog