const mapsRouter = require('express').Router();
const { fetchMap } = require('../controllers/mapsController');

mapsRouter.route('/:site_id').get(fetchMap);

module.exports = { mapsRouter };
