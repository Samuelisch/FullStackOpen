const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response, next) => {
  await Blog
    .find({})
    .then((blogs) => {
      response.json(blogs);
    })
    .catch((error) => next(error));
});

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body);

  await blog
    .save()
    .then((savedBlog) => savedBlog.toJSON())
    .then((savedAndFormattedBlog) => {
      response.json(savedAndFormattedBlog);
    })
    .catch((error) => next(error));
});

module.exports = blogsRouter;
