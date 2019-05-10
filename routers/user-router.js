const userRouter = require('express').Router();
const {
  fetchAllUsers,
  fetchSingleUser,
  fetchUserJobs,
  sendJobUserLink
} = require('../controllers/userController');

userRouter.route('/').get(fetchAllUsers);
userRouter.route('/:email').get(fetchSingleUser);
userRouter.route('/:email/jobs').get(fetchUserJobs);
userRouter.route('/:email/jobs/link').post(sendJobUserLink);

module.exports = { userRouter };
