const apiRouter = require('express').Router();
const { userRouter } = require('./user-router');
const { jobRouter } = require('./job-router');
const { siteRouter } = require('./site-router');

apiRouter.use('/users', userRouter);
apiRouter.use('/jobs', jobRouter);
apiRouter.use('/sites', siteRouter);

module.exports = { apiRouter };
