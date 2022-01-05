import React, { useState } from 'react'
import styled from 'styled-components'

const StyledListContainer = styled.li`
  border: 1px solid black;
  margin: 10px;
  padding: 5px;
  list-style: none;

  p {
    margin: 0;
  }
`

const StyledDiv = styled.div`
  display: flex;
  align-items: center;

  p {
    margin-right: 5px;
  }
`

const Blog = ({ blog, user, updateBlog, removeBlog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [blogLikes, setBlogLikes] = useState(blog.likes)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const addLikeToBlog = () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    updateBlog(blog.id, newBlog)
    setBlogLikes(blogLikes + 1)
  }

  const matchingIds = () => {
    return blog.user[0].id === user.id  || blog.user[0] === user.id
  }

  return (
    <StyledListContainer>
      <StyledDiv>
        <p>{blog.title} by {blog.author}</p>
        <button className="viewButton" type="button" onClick={toggleDetails}>{showDetails ? 'hide' : 'view'}</button>
      </StyledDiv>
      {showDetails &&
        <>
          <p><a href={blog.url}>{blog.url}</a></p>
          <StyledDiv>
            <p>Likes: {blogLikes}</p>
            <button className="likeButton" type="button" onClick={addLikeToBlog}>like</button>
          </StyledDiv>
          <p><em>{blog.user[0].username}</em></p>
          {user && matchingIds() &&
            <button className="deleteButton" type="button" onClick={() => removeBlog(blog.id)}>remove</button>
          }
        </>
      }
    </StyledListContainer>
  )
}

export default Blog