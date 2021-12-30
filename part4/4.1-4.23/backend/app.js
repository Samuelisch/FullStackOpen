const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('express-async-errors')
const config = require('./utils/config');
const middleware = require('./utils/middleware')
const logger = require('./utils/logger');
const blogsRouter = require('./controllers/blogs')

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

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
