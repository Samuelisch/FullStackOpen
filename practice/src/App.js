import React, { useState } from 'react'

const Most = ({quote, max}) => {
  if (max) {
    return (
      <div>
        <p>{quote}</p>
        <p>has {max} votes</p>
      </div>
    )
  }

  return (
    <div>Votes required</div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [voteArr, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const nextQuote = () => {
    let copySelect = Math.floor(Math.random() * anecdotes.length);
    //set to display
    setSelected(copySelect);
  }

  const addVote = () => {
    const copyVote = [...voteArr];
    copyVote[selected] += 1;
    setVotes(copyVote);
  }

  let maxVotes = Math.max(...voteArr);
  let maxQuotes = anecdotes[voteArr.indexOf(maxVotes)];

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <div>
      {anecdotes[selected]}
      </div>
      <div>
        has {voteArr[selected]} votes
      </div>
      <div>
        <button onClick={addVote}>vote</button>
        <button onClick={nextQuote}>next anecdote</button>
      </div>
      <h2>Anecdote with most votes</h2>
      <Most quote={maxQuotes} max={maxVotes} />
    </div>
  )
}

export default App