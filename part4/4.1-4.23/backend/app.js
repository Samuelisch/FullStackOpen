const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const middleware = require('./utils/middleware')
const logger = require('./utils/logger');
const Blog = require('./models/blog');

const app = express();

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MONGODB');
  })
  .catch((error) => {
    logger.error('error connecting to MONGODB', error.message)
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then((blogs) => {
      response.json(blogs);
    });
});

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then((savedBlog) => savedBlog.toJSON())
    .then((savedAndFormattedBlog) => {
      response.json(savedAndFormattedBlog);
    })
    .catch(error => logger.error('failed to post', error.message))
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
