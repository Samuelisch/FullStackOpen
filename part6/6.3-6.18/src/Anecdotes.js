import React from "react";
import { connect } from "react-redux";
import { voteAnecdote } from "./reducers/anecdoteReducer";
import { displayNotification } from "./reducers/notificationReducer";

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

const Anecdotes = (props) => {
  const orderedAnecdotes = props.anecdotesToShow.sort((a, b) => b.votes - a.votes)

  const handleVote = (anecdote) => {
    props.voteAnecdote(anecdote)
    props.displayNotification(`voted for ${anecdote.content}`, 5)
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

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: state.anecdotes
      .filter(anecdote =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
      .sort((a, b) => b.votes - a.votes),
    filter: state.filter
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  displayNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Anecdotes)