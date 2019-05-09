const express = require('express');
const cors = require('cors');
const {
  routeNotFound,
  handle500,
  handleCustomErrors,
  handlePsqlErrors
} = require('./errors');

const app = express();

app.use(cors());
app.use(express.json());

app.all('/*', routeNotFound);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handle500);

module.exports = app;
