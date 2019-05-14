const apiRouter = require('express').Router();
const { userRouter } = require('./user-router');
const { jobRouter } = require('./job-router');
const { siteRouter } = require('./site-router');
const { mapsRouter } = require('./maps-router');
const { getAllRoutes } = require('../controllers/apiController');

apiRouter.route('/').get(getAllRoutes);
apiRouter.use('/users', userRouter);
apiRouter.use('/jobs', jobRouter);
apiRouter.use('/sites', siteRouter);
apiRouter.use('/maps', mapsRouter);

module.exports = { apiRouter };
