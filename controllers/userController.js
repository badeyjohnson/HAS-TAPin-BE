const { getAllUsers } = require('../models/userModels');

exports.fetchAllUsers = (req, res, next) => {
  getAllUsers(req.params).then(users => {
    if (users.length === 0) {
      next({ status: 404, msg: 'No users' });
    } else {
      res.status(200).json({ users });
    }
  });
};
