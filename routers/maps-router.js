const mapsRouter = require('express').Router();
const { fetchMap, sendMap } = require('../controllers/mapsController');

mapsRouter
  .route('/:site_id')
  .get(fetchMap)
  .post(sendMap);

module.exports = { mapsRouter };
