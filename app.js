const express = require('express');

const scoreRouter = require('./router/scoreRouter');

const app = express();

app.use('/api/score', scoreRouter)

module.exports = app;