import React from "react"

const BlogForm = ({ submitHandler, title, author, url, setTitle, setAuthor, setUrl }) => {
  return (
    <div>
      <h2>Add Blog</h2>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="title">Title:</label>
          <input 
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input 
            type="text"
            id="author"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">Url:</label>
          <input 
            type="text"
            id="url"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Add blog</button>
      </form>
    </div>
  )
}

export default BlogForm