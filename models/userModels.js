const connection = require('../db/connection');

exports.getAllUsers = () => {
  return connection.select('*').from('users');
};

exports.getUser = ({ email }) => {
  return connection
    .select('*')
    .from('users')
    .where({ email });
};

exports.getJobs = ({ email }) => {
  return connection
    .select('*')
    .from('jobs')
    .where({ email });
};
