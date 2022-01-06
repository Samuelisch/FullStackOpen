import React from "react"
import ReactDOM from 'react-dom'
import { createStore } from "redux"
import blogReducer from "./reducers/noteReducer"

const store = createStore(blogReducer)

store.dispatch({
  type: 'NEW_BLOG',
  data: {
    title: 'the app state is in redux store',
    author: 'testuser',
    url: 'www.testurl.com',
    likes: 0,
    id: 1
  }
})

store.dispatch({
  type: 'NEW_BLOG',
  data: {
    title: 'state changes are made with actions',
    author: 'testuser',
    url: 'www.testurl.com',
    likes: 0,
    id: 2
  }
})

const App = () => {
  return(
    <div>
      <ul>
        {store.getState().map(blog=>
          <li key={blog.id}>
            <div>
              Title: {blog.title} Author: {blog.author} url: {blog.url} likes: {blog.likes}
            </div>
          </li>
        )}
        </ul>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)