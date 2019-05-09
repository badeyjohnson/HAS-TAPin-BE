const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const { apiRouter } = require('./routers/api-router');
const {
  routeNotFound,
  handle500,
  handleCustomErrors,
  handlePsqlErrors
} = require('./errors');

const app = express();

app.use(cors());
// app.use(bodyParser);
app.use(express.json());

app.use('/api', apiRouter);

app.all('/*', routeNotFound);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handle500);

module.exports = app;
