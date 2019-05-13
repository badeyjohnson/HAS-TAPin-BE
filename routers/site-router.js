const siteRouter = require('express').Router();
const {
  fetchAllSites,
  fetchSingleSite,
  fetchSiteRiskAssessments,
  sendNewRiskAssessment,
  fetchRiskAssessment
} = require('../controllers/siteController');

siteRouter.route('/').get(fetchAllSites);
siteRouter.route('/:site_id').get(fetchSingleSite);
siteRouter
  .route('/:site_id/risk_assessments')
  .get(fetchSiteRiskAssessments)
  .post(sendNewRiskAssessment);
siteRouter.route('/:site_id/:site_specific_id').get(fetchRiskAssessment);

module.exports = { siteRouter };
