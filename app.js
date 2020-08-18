const express = require('express');

const scoreRouter = require('./router/scoreRouter');

const app = express();

app.use(express.json({ limit: '10kb' }));

app.get('/', (req, res, next) => {
  if (!req.query.name || !req.query.username) {
    res.status(404).send('bad request');
    next('bad request');
  }
  next();
});
app.use(express.static('public'));

app.use('/api', scoreRouter);

module.exports = app;
