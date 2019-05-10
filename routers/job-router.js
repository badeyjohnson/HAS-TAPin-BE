const jobRouter = require('express').Router();
const {
  fetchAllJobs,
  fetchSingleJob,
  fetchJobSites,
  sendNewSite
} = require('../controllers/jobController');

jobRouter.route('/').get(fetchAllJobs);
jobRouter.route('/:job_no').get(fetchSingleJob);
jobRouter
  .route('/:job_no/sites')
  .get(fetchJobSites)
  .post(sendNewSite);

module.exports = { jobRouter };
