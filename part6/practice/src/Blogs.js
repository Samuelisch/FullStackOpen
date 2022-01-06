import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog } from "./reducers/noteReducer";

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
  const blogs = useSelector(state => state)

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