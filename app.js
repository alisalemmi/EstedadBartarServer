const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({
  path: './config.env'
});

mongoose.connect(
  process.env.MONGODB,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  },
  () => {
    console.log('DB connection successfull :)');
  }
);

const TestSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const Test = mongoose.model('Test', TestSchema);

const app = express();

app.get('/', async (req, res) => {
  const tour = await Test.find();

  res.status(200).json(tour);
});

app.get('/add/:name/:age', async (req, res) => {
  const t = new Test({
    name: req.params.name,
    age: req.params.age
  });

  await t.save();
  res.status(200).json({ message: 'hello', params: req.params });
});

app.listen(process.env.PORT, () =>
  console.log(`App is running on port ${process.env.PORT} ...`)
);
