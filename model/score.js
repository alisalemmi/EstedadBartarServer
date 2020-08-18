const mongoose = require('mongoose');

const setScoreSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String,
    required: [true, 'username is required']
  },
  game: {
    type: String,
    enum: ['directedSquare', 'colorSquare'],
    required: [true, 'name of the game is required']
  },
  correct: {
    type: Number,
    required: [true, 'correct number is required'],
    validate: {
      validator: n => Number.isInteger(n) && n >= 0,
      message: 'correct number must be positive integer'
    }
  },
  wrong: {
    type: Number,
    required: [true, 'wrong number is required'],
    validate: {
      validator: n => Number.isInteger(n) && n >= 0,
      message: 'wrong number must be positive integer'
    }
  },
  score: {
    type: Number,
    required: [true, 'score is required'],
    validate: {
      validator: Number.isInteger,
      message: 'score must be integer'
    }
  }
});

module.exports = mongoose.model('Scores', setScoreSchema);
