const mongoose = require('mongoose');

const Player = require('../model/player');
const player = require('../model/player');

/**
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
module.exports.updatePlayer = async (req, res, next) => {
  try {
    const maxScore = {};
    maxScore[req.params.game] = req.body.score;

    const newPlayer = await Player.findOneAndUpdate(
      { username: req.params.username },
      { $max: maxScore },
      {
        new: true,
        runValidators: true
      }
    );

    if (newPlayer) {
      req.maxScore = newPlayer[req.params.game];
      next();
    } else next('username not found');
  } catch (err) {
    next(err);
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
module.exports.createPlayer = async (req, res, next) => {
  try {
    const player = await Player.findOneAndUpdate(
      { username: req.params.username },
      { username: req.params.username, name: req.params.name },
      {
        new: true,
        runValidators: true,
        upsert: true
      }
    ).select('-_id -__v');

    res.status(200).json({ status: 'successful', info: player });
  } catch {}
};

const topsAggregate = gameName => {
  const game = {};
  game[gameName] = { $exists: true };

  return Player.aggregate([
    { $match: game },
    { $group: { _id: `$${gameName}`, name: { $push: '$name' } } },
    { $sort: { _id: -1 } },
    { $limit: 10 },
    {
      $group: { _id: 1, items: { $push: { name: '$name', score: '$_id' } } }
    },
    { $unwind: { path: '$items', includeArrayIndex: 'rank' } },
    { $unwind: { path: '$items.name' } },
    {
      $project: {
        _id: false,
        name: '$items.name',
        score: '$items.score',
        rank: { $add: ['$rank', 1] }
      }
    }
  ]);
};

const rankAggregate = (gameName, userName) => {
  const game = {};
  game[gameName] = { $exists: true };

  return player.aggregate([
    { $match: game },
    {
      $group: {
        _id: `$${gameName}`,
        username: { $push: '$username' }
      }
    },
    { $sort: { _id: -1 } },
    {
      $group: {
        _id: 1,
        items: { $push: { username: '$username', score: '$_id' } }
      }
    },
    { $unwind: { path: '$items', includeArrayIndex: 'rank' } },
    { $unwind: { path: '$items.username' } },
    { $match: { 'items.username': userName } },
    {
      $project: {
        _id: false,
        username: '$items.username',
        score: '$items.score',
        rank: { $add: ['$rank', 1] }
      }
    }
  ]);
};

/**
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
module.exports.getRank = async (req, res, next) => {
  try {
    const [tops, rank] = await Promise.all([
      topsAggregate(req.params.game),
      rankAggregate(req.params.game, req.params.username)
    ]);

    res.status(201).json({ status: 'successful', tops, rank: rank[0] });
  } catch (er) {
    next(er);
  }
};

module.exports.getTops = async (req, res, next) => {
  try {
    const tops = await topsAggregate(req.params.game);

    res.status(200).json({ status: 'successful', tops });
  } catch (er) {
    next(er);
  }
};
