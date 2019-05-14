const {
  getAllSites,
  getSite,
  getSitesRiskAssessments,
  postNewRiskAssessment,
  getRiskAssessment,
  getRiskAssessmentQuestions
} = require('../models/siteModels');

exports.fetchAllSites = (req, res, next) => {
  getAllSites(req.params).then(sites => {
    res.status(200).json({ sites });
  });
};

exports.fetchSingleSite = (req, res, next) => {
  getSite(req.params).then(([site]) => {
    if (site.length === 0) {
      next({ status: 404, msg: 'Site does not exist' });
    } else {
      res.status(200).json({ site });
    }
  });
};
exports.fetchRiskAssessmentQuestions = (req, res, next) => {
  getRiskAssessmentQuestions().then(questions => {
    res.status(200).json({ questions });
  });
};

exports.fetchSiteRiskAssessments = (req, res, next) => {
  getSitesRiskAssessments(req.params).then(riskAssessments => {
    res.status(200).json({ riskAssessments });
  });
};

exports.sendNewRiskAssessment = (req, res, next) => {
  postNewRiskAssessment(req.params, req.body).then(riskAssessment => {
    if (riskAssessment)
      res.status(202).json({ response: 'Risk assessment created' });
    else next(res.status(400).json({ response: 'errored' }));
  });
};

exports.fetchRiskAssessment = (req, res, next) => {
  getRiskAssessment(req.params).then(riskAssessment => {
    res.status(200).json({ count: riskAssessment.length, riskAssessment });
  });
};
