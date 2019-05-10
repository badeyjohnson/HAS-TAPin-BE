const {
  getAllUsers,
  getUser,
  getJobs,
  postJobUserLink
} = require('../models/userModels');

exports.fetchAllUsers = (req, res, next) => {
  getAllUsers(req.params).then(users => {
    if (users.length === 0) {
      next({ status: 404, msg: 'No users' });
    } else {
      res.status(200).json({ users });
    }
  });
};

exports.fetchSingleUser = (req, res, next) => {
  getUser(req.params).then(([user]) => {
    if (user.length === 0) {
      next({ status: 404, msg: 'User does not exist' });
    } else {
      res.status(200).json({ user });
    }
  });
};

exports.fetchUserJobs = (req, res, next) => {
  getJobs(req.params).then(jobs => {
    res.status(200).json({ jobs });
  });
};

exports.sendJobUserLink = (req, res, next) => {
  postJobUserLink(req.params, req.body).then(returned => {
    if (returned) res.status(202).json({ response: 'Job added to user' });
    else next(res.status(400).json({ response: 'Job not found' }));
  });
};
