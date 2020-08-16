const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  maxScore: {
    magicSquare: Number,
    colorSqure: Number
  }
});

module.exports = mongoose.model('Players', playerSchema);
