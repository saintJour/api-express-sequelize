const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const app = express();
const cors = require('cors');
const routes = require('./routes');

app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);
app.use(cors());

module.exports = app;
