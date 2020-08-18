const express = require('express');
const { Router } = require('express');

const scoreController = require('../controller/scoreController');
const playerController = require('../controller/playerController');

const scoreRouter = Router();

scoreRouter.post(
  '/setScore/:game/:username',
  playerController.updatePlayer,
  scoreController.setScore,
  playerController.getRank
);

scoreRouter.get('/rank/:game', playerController.getTops)

scoreRouter.get('/init/:username/:name', playerController.createPlayer);

module.exports = scoreRouter;
