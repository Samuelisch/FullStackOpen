import React from "react";
import { connect } from "react-redux";
import { createAnecdote } from "./reducers/anecdoteReducer";
import { displayNotification } from "./reducers/notificationReducer";

const AnecdoteForm = (props) => {

  const addAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.content.value
    e.target.content.value = ''
    props.createAnecdote(content)
    props.displayNotification(`Successfully added new anecdote ${content}`, 5)
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

export default connect(
  null,
  {
    createAnecdote,
    displayNotification
  }
)(AnecdoteForm)