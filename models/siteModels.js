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

exports.postNewRiskAssessment = ({ site_id }, { email, response }) => {
  return connection
    .select('site_id')
    .from('sites')
    .then(allSites => {
      const isExistingSite = allSites.filter(
        site => site.site_id === parseInt(site_id)
      );
      if (isExistingSite.length !== 0)
        return connection
          .insert({
            site_id,
            user: email
          })
          .into('site_specific')
          .then(id => {
            return Promise.all(
              response.map(answer => {
                return connection
                  .insert({
                    question_id: answer.question_id,
                    site_specific_id: id,
                    answers_options: answer.answers_options,
                    mitigation_Measures: answer.mitigation_Measures,
                    risk_level: answer.risk_level,
                    multi_option: answer.multi_option
                  })
                  .into('risks_answers');
              })
            );
          });
      else return;
    });
};

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
      'mitigation_Measures',
      'questions.question_id'
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
