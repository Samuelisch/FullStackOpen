import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "./reducers/anecdoteReducer";
import { displayNotification, hideNotification } from "./reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.content.value
    e.target.content.value = ''
    dispatch(createAnecdote(content))
    dispatch(displayNotification('created anecdote'))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 2000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="content" placehodler="anecdote" />
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default AnecdoteForm