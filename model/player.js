const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'username is required'],
    unique: true
  },
  name: {
    type: String,
    required: [true, 'name is required']
  },
  directedSquare: Number,
  colorSquare: Number
});

module.exports = mongoose.model('Players', playerSchema);
