import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const sendAction = (e) => {
    const actionType = e.target.dataset.action
    store.dispatch({
      type: actionType
    })
  }

  return (
    <div>
      <button data-action="GOOD" onClick={sendAction}>good</button> 
      <button data-action="OK" onClick={sendAction}>ok</button> 
      <button data-action="BAD" onClick={sendAction}>bad</button>
      <button data-action="ZERO" onClick={sendAction}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
