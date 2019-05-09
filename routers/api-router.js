const apiRouter = require('express').Router();
const { userRouter } = require('./user-router');

apiRouter.use('/user', userRouter);

module.exports = { apiRouter };
