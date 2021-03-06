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

exports.getUserJobs = ({ email }) => {
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
  return connection
    .select('job_no')
    .from('jobs')
    .then(jobNumbers => {
      const isExistingJob = jobNumbers.filter(
        jobNumber => jobNumber.job_no === job_no
      );
      if (isExistingJob.length === 0) return;
      else return connection.insert({ job_no, email }).into('jobs_users');
    });
};

exports.postNewJob = (
  { email },
  { job_no, job_name, pm_first_name, pm_last_name, pm_email, pm_number }
) => {
  return connection
    .select('job_no')
    .from('jobs')
    .then(jobNumbers => {
      const isExistingJob = jobNumbers.filter(
        jobNumber => jobNumber.job_no === job_no
      );
      if (isExistingJob.length === 0)
        return connection
          .insert({
            job_no,
            job_name,
            pm_first_name,
            pm_last_name,
            pm_email,
            pm_number
          })
          .into('jobs')
          .then(() => {
            return connection.insert({ job_no, email }).into('jobs_users');
          });
      else return;
    });
};
