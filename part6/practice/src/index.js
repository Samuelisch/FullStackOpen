import React from "react"
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from "redux"
import { Provider } from "react-redux"
import App from "./App"
import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer from "./reducers/blogReducer"
import filterReducer from "./reducers/filterReducer"

const reducer = combineReducers({
  blogs: blogReducer,
  filter: filterReducer
})

const store = createStore(
    reducer,
    composeWithDevTools()
  )

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('root'))