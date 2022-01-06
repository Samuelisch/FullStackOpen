import React from "react"
import ReactDOM from 'react-dom'
import { createStore } from "redux"
import { Provider } from "react-redux"
import blogReducer from "./reducers/noteReducer"
import App from "./App"

const store = createStore(blogReducer)

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('root'))