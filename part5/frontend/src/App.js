import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(initialBlogs =>
      setBlogs(initialBlogs)
    )  
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (e) => {
    e.preventDefault()

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    try {
      await blogService.create(newBlog)
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <div>
      <h1>Blog App</h1>
      <Notification message={errorMessage} />

      {user === null ? 
        <LoginForm 
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          submitHandler={handleLogin}
        /> 
        : 
        <div>
          <p>Logged in as {user.name}</p>
          <BlogForm 
            title={newTitle}
            author={newAuthor}
            url={newUrl}
            setTitle={setNewTitle}
            setAuthor={setNewAuthor}
            setUrl={setNewUrl}
            submitHandler={addBlog}
          />
        </div>
      }

      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App