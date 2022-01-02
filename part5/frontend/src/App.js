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
  const [notificationMessage, setNotificationMessage] = useState({
      text: null,
      isError: null
    })

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    if (notificationMessage.text) {
      setTimeout(() => {
        setNotificationMessage({
          text: null,
          isError: null
        })
      }, 5000)
    }
  }, [notificationMessage])

  useEffect(() => {
    blogService.getAll().then(initialBlogs =>
      setBlogs(initialBlogs)
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage({
        text: 'Wrong username or password',
        isError: true
      })
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
    setNotificationMessage({
      text: `logged out`,
      isError: false
    })
  }

  const addBlog = async (e) => {
    e.preventDefault()

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    try {
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      setNotificationMessage({
        text: `New Blog ${returnedBlog.title} by ${returnedBlog.author} has been added`,
        isError: false
      })
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    } catch (exception) {
      setNotificationMessage({
        text: 'Required field missing',
        isError: true
      })
    }
  }

  return (
    <div>
      <h1>Blog App</h1>
      <Notification 
        message={notificationMessage.text}
        isError={notificationMessage.isError}
      />

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
          <div>
            Logged in as {user.name}
            <button onClick={handleLogout}>logout</button>
          </div>
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