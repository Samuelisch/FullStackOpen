import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "./reducers/anecdoteReducer";

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
  const anecdotes = useSelector(state => state.anecdotes)
  const orderedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

  return (
    <ul>
      {orderedAnecdotes.map(anecdote => 
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => dispatch(voteAnecdote(anecdote.id))}
        />  
      )}
    </ul>
  )
}

export default Anecdotes