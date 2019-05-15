const connection = require('../db/connection');

exports.getAllJobs = () => {
  return connection.select('*').from('jobs');
};

exports.getJob = ({ job_no }) => {
  return connection
    .select('*')
    .from('jobs')
    .where({ job_no });
};

exports.getJobSites = ({ job_no }) => {
  return connection
    .select('site_id', 'sites.job_no', 'site_name', 'site_description')
    .from('sites')
    .join('jobs', 'jobs.job_no', '=', 'sites.job_no')
    .where({ 'jobs.job_no': job_no });
};

exports.postNewSite = ({ job_no }, { site_name, site_description }) => {
  return connection
    .select('job_no')
    .from('jobs')
    .then(jobNumbers => {
      const isExistingJob = jobNumbers.filter(
        jobNumber => jobNumber.job_no === parseInt(job_no)
      );
      if (isExistingJob.length !== 0)
        return connection
          .insert({
            job_no,
            site_name,
            site_description
          })
          .into('sites');
      else return;
    });
};
