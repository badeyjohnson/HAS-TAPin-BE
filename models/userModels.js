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
    .select(
      'jobs.job_no',
      'job_name',
      'pm_first_name',
      'pm_last_name',
      'pm_email',
      'pm_number'
    )
    .from('jobs')
    .join('jobs_users', 'jobs_users.job_no', '=', 'jobs.job_no')
    .join('users', 'users.email', '=', 'jobs_users.email')
    .where({ 'users.email': email });
};

exports.postJobUserLink = ({ email }, { job_no }) => {
  return connection.insert({ job_no, email }).into('jobs_users');
};
