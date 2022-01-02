import React from 'react'
const Blog = ({blog}) => (
  <div>
    <p>Title: {blog.title}</p>
    <p>Author: {blog.author}</p>
    <p><a href={blog.url}>{blog.url}</a></p>
    <hr />
  </div>  
)

export default Blog