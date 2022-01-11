import anecdoteService from "../services/anecdotes"

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_ANECDOTE': 
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    case 'ADD_VOTE': {
      return state.map(anecdote => anecdote.id === action.data.id ? action.data : anecdote)
    }
    default:
      return state
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = { ...anecdote, votes : anecdote.votes + 1 }
    const returnedAnecdote = await anecdoteService.update(anecdote.id ,newAnecdote)
    dispatch({
      type: 'ADD_VOTE',
      data: returnedAnecdote
    })
  }
}

export default anecdoteReducer