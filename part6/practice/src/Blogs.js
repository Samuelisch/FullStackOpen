import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog } from "./reducers/blogReducer";

const Blog = ({ blog, handleClick}) => {
  return (
    <li key={blog.id}>
      <div>
        Title: {blog.title} Author: {blog.author} url: {blog.url} likes: {blog.likes}
      </div>
      <button type="button" onClick={handleClick}>like</button>
    </li>
  )
}

const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(({ filter, blogs}) => {
    if (filter === 'ALL') {
      return blogs
    }
    return filter === 'LIKED'
      ? blogs.filter(blog => blog.likes)
      : blogs.filter(blog => !blog.likes)
  })

  return (
    <ul>
      {blogs.map(blog => 
        <Blog 
          key={blog.id}
          blog={blog}
          handleClick={() => dispatch(likeBlog(blog.id))}
        />  
      )}
    </ul>
  )
}

export default Blogs