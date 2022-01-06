import React from 'react'
import Anecdotes from './Anecdotes'
import AnecdoteForm from './AnecdoteForm'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Anecdotes />
      <AnecdoteForm />
    </div>
  )
}

export default App