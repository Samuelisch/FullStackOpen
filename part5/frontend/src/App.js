import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState({
    text: null,
    isError: null
  })

  const [blogs, setBlogs] = useState([])

  const blogFormRef = useRef()

  useEffect(() => {
    if (notificationMessage.text) {
      setTimeout(() => {
        setNotificationMessage({
          text: null,
          isError: null
        })
      }, 3000)
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

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
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
      text: 'logged out',
      isError: false
    })
  }

  const addBlog = async (newBlog) => {
    try {
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      setNotificationMessage({
        text: `New Blog ${returnedBlog.title} by ${returnedBlog.author} has been added`,
        isError: false
      })
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      setNotificationMessage({
        text: 'Required field missing',
        isError: true
      })
    }
  }

  const updateBlog = async (id, updatedBlog) => {
    try {
      const returnedBlog = await blogService.update(id, updatedBlog)
      setBlogs(blogs.filter(blog => blog.id === id ? returnedBlog : blog))
    } catch (exception) {
      setNotificationMessage({
        text: 'something went wrong',
        isError: true
      })
    }
  }

  const removeBlog = async (id) => {
    try{
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      setNotificationMessage({
        text: 'blog has been removed',
        isError: false
      })
    } catch (exception) {
      setNotificationMessage({
        text: 'cannot remove blog',
        isError: true
      })
    }
  }

  const orderedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h1>Blog App</h1>
      <Notification
        message={notificationMessage.text}
        isError={notificationMessage.isError}
      />

      {user === null ?
        <Togglable buttonLabel="login">
          <LoginForm handleLogin={handleLogin} />
        </Togglable>
        :
        <div>
          <div>
            Logged in as {user.name}
            <button onClick={handleLogout}>logout</button>
          </div>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      }

      <h2>Blogs</h2>
      {orderedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          updateBlog={updateBlog}
          removeBlog={removeBlog}
        />
      )}
    </div>
  )
}

export default App