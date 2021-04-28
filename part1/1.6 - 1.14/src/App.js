import React, { useState } from 'react'


const MostVotes = ({maxVotes, maxAnecdote}) => {
  if (maxVotes > 0) {
    return (
      <div>
        <p>{maxAnecdote}</p>
        <p>has {maxVotes} votes</p>
      </div>
    )
  }
  return (
    <div />
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votesArr, setVotesArr] = useState(new Array(anecdotes.length).fill(0))

  const randomSelect = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const addVotes = () => {
    let copy = [...votesArr]
    copy[selected] += 1
    setVotesArr(copy)
  }

  let maxVotes = Math.max(...votesArr)
  let maxAnecdote = anecdotes[votesArr.indexOf(maxVotes)]

  return (
    <div>
      <h2>Anecdote of the day:</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votesArr[selected]} votes</p>
      <button onClick={() => addVotes()}>vote</button>
      <button onClick={() => randomSelect()}>next anecdote</button>
      <h2>Anecdote with most votes:</h2>
      <MostVotes maxVotes={maxVotes} maxAnecdote={maxAnecdote} />
    </div>
  )
}

export default App
