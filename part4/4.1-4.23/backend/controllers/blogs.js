const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const userExtractor = require('../utils/middleware').userExtractor;

blogsRouter.get('/', async (request, response) => {
  const fetchedBlogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(fetchedBlogs)
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
});

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  
  const user = request.user
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await User.findByIdAndUpdate(user._id, {blogs: user.blogs})

  response.json(savedBlog)
});

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body

  const updatedBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }

  const resultBlog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog)
  response.json(resultBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(400).json({ error: 'item not created by user'})
  }
});

module.exports = blogsRouter;
