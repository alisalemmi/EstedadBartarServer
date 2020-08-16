const mongoose = require('mongoose');

const setScoreSchema = new mongoose.Schema({
  player: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  correct: {
    type: Number,
    required: true
  },
  wrong: {
    type: Number,
    required: true
  },
  score: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Scores', setScoreSchema)