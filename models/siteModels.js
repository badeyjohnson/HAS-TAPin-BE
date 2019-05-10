const connection = require('../db/connection');

exports.getAllSites = () => {
  return connection.select('*').from('sites');
};

exports.getSite = ({ site_id }) => {
  return connection
    .select('*')
    .from('sites')
    .where({ site_id });
};

exports.getSitesRiskAssessments = ({ site_id }) => {
  return connection
    .select('*')
    .from('sites')
    .join('site_specific', 'site_specific.site_id', '=', 'sites.site_id')
    .where({ 'sites.site_id': site_id });
};

// exports.postNewRiskAssessment = (
//   { job_no },
//   { site_name, site_description }
// ) => {
//   return connection
//     .select('job_no')
//     .from('jobs')
//     .then(jobNumbers => {
//       const isExistingJob = jobNumbers.filter(
//         jobNumber => jobNumber.job_no === parseInt(job_no)
//       );
//       if (isExistingJob.length !== 0)
//         return connection
//           .insert({
//             job_no,
//             site_name,
//             site_description
//           })
//           .into('sites');
//       else return;
//     });
// };

exports.getRiskAssessment = ({ site_specific_id }) => {
  return connection
    .select(
      'job_no',
      'sites.site_id',
      'site_name',
      'site_description',
      'user',
      'created_at',
      'site_specific.site_specific_id',
      'question',
      'answer',
      'risk',
      'multi_option',
      'mitigation_Measures'
    )
    .from('site_specific')
    .join('sites', 'sites.site_id', '=', 'site_specific.site_id')
    .join(
      'risks_answers',
      'risks_answers.site_specific_id',
      '=',
      'site_specific.site_specific_id'
    )
    .join(
      'risk_level',
      'risk_level.risk_level_id',
      '=',
      'risks_answers.risk_level'
    )
    .join(
      'answers_options',
      'answers_options.answers_options_id',
      '=',
      'risks_answers.answers_options'
    )
    .join(
      'questions',
      'questions.question_id',
      '=',
      'risks_answers.question_id'
    )
    .where({ 'site_specific.site_specific_id': site_specific_id });
};
