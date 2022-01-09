import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "./reducers/anecdoteReducer";
import { displayNotification, hideNotification } from "./reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button type="button" onClick={handleClick}>vote</button>
      </div>
    </li>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter.length > 0) {
      return anecdotes.filter(anecdote => anecdote.content.includes(filter))
    } else {
      return anecdotes
    }
  })
  const orderedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(displayNotification(`voted for ${anecdote.content}`, 5))
  }

  return (
    <ul>
      {orderedAnecdotes.map(anecdote => 
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleVote(anecdote)}
        />  
      )}
    </ul>
  )
}

export default Anecdotes