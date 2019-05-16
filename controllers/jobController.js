const {
  getAllJobs,
  getJob,
  getJobSites,
  postNewSite
} = require('../models/jobModels');

exports.fetchAllJobs = (req, res, next) => {
  getAllJobs(req.params).then(jobs => {
    res.status(200).json({ jobs });
  });
};

exports.fetchSingleJob = (req, res, next) => {
  getJob(req.params).then(([job]) => {
    if (job.length === 0) {
      next({ status: 404, msg: 'job does not exist' });
    } else {
      res.status(200).json({ job });
    }
  });
};

exports.fetchJobSites = (req, res, next) => {
  getJobSites(req.params).then(sites => {
    res.status(200).json({ sites });
  });
};

exports.sendNewSite = (req, res, next) => {
  postNewSite(req.params, req.body).then(site => {
    if (site) {
      getJobSites(req.params).then(sites => {
        const addedSite = sites[sites.length - 1];
        res.status(202).json({ addedSite });
      });
    } else next(res.status(400).json({ response: 'errored' }));
  });
};
