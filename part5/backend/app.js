const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('express-async-errors')
const config = require('./utils/config');
const middleware = require('./utils/middleware')
const logger = require('./utils/logger');

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express();

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MONGODB');
  })
  .catch((error) => {
    logger.error('error connecting to MONGODB', error.message)
  });

app.use(middleware.tokenExtractor)
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testRouter')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
