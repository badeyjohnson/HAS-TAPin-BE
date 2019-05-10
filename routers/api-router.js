const apiRouter = require('express').Router();
const { userRouter } = require('./user-router');
const { jobRouter } = require('./job-router');

apiRouter.use('/users', userRouter);
apiRouter.use('/jobs', jobRouter);

module.exports = { apiRouter };
