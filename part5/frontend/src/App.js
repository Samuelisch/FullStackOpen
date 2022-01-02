import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(initialBlogs =>
      setBlogs(initialBlogs)
    )  
  }, [])

  const onUsernameChange = (e) => setUsername(e.target.value)
  const onPasswordChange = (e) => setPassword(e.target.value)

  const handleLogin = (e) => {
    e.preventDefault()
    console.log('logging in with', username, password)
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username: </label>
          <input 
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={onUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input 
            id="password"
            name="password"
            value={password}
            onChange={onPasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App