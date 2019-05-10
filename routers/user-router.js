const userRouter = require('express').Router();
const {
  fetchAllUsers,
  fetchSingleUser,
  fetchUserJobs
} = require('../controllers/userController');

userRouter.route('/').get(fetchAllUsers);
userRouter.route('/:email').get(fetchSingleUser);
userRouter.route('/:email/jobs').get(fetchUserJobs);

module.exports = { userRouter };
