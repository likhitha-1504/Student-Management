const express = require('express');
const app = express();

const logger = require('./middlewares/logger.middleware');
const errorHandler = require('./middlewares/error.middleware');
const notFound = require('./middlewares/notFound.middleware');

const studentRoutes = require('./routes/student.routes');

app.use(express.json());
app.use(logger);

app.use('/api/students', studentRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;