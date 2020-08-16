const express = require('express');

const app = express();

app.get('/:id', (req, res) => {
  res.status(200).json({ message: 'hello', params: req.params });
});

app.listen(3000, () => console.log('App is running on port 3000 ...'));
