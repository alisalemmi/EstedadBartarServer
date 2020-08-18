const mongoose = require('mongoose');

const Score = require('../model/score');

/**
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
module.exports.setScore = async (req, res, next) => {
  try {
    const newScore = new Score({
      username: req.params.username,
      game: req.params.game,
      correct: req.body.correct,
      wrong: req.body.wrong,
      score: req.body.score
    });

    await newScore.save();

    next();
  } catch (err) {
    next(err.message);
  }
};

