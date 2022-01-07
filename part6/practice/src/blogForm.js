import React from "react"
import { useDispatch } from "react-redux"
import { createBlog } from "./reducers/blogReducer"

const NewBlog = (props) => {
  const dispatch = useDispatch()

  const addBlog = (e) => {
    e.preventDefault()
    const title = e.target.title.value
    const author = e.target.author.value
    const url = e.target.url.value
    e.target.reset()
    dispatch(createBlog(title, author, url))
  }

  return (
    <form onSubmit={addBlog}>
        <input name="title" placeholder="title" />
        <input name="author" placeholder="author" />
        <input name="url" placeholder="url" />
        <button type="submit">add</button>
      </form>
  )
}

export default NewBlog