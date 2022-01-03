import React, { useState } from "react"

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    handleLogin({username, password})
    
    setUsername('')
    setPassword('')
  }

  return (
    <div>      
        <h2>Login</h2>
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="username">Username: </label>
            <input 
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input 
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
    </div>
  )
}

export default LoginForm