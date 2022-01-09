const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_ANECDOTE': 
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    case 'ADD_VOTE': {
      const id = action.data.id
      const toChange = state.find(a => a.id === id)
      const newAnecdote = {
        ...toChange,
        votes: toChange.votes + 1
      }
      return state.map(anecdote => anecdote.id === id ? newAnecdote : anecdote)
    }
    default:
      return state
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data
  }
}

export const initializeAnecdotes = (data) => {
  return {
    type: 'INIT_ANECDOTES',
    data
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'ADD_VOTE',
    data: { id }
  }
}

export default anecdoteReducer