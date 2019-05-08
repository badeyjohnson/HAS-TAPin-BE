const {
  bookletData,
  jobsData,
  mapsData,
  sitesData,
  usersData,
  sitesUsersData,
  questionsData,
  siteUsersData,
  riskLevelData,
  answersOptionsData,
  siteSpecficData,
  riskAnswersData
} = require('../data');

const { formatUsers, formatMaps } = require('../../utils/utils');

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      const formatedUsers = formatUsers(usersData);
      return knex('users').insert(formatedUsers);
    })
    .then(() => {
      return knex('jobs').insert(jobsData);
    })
    .then(() => {
      return knex('sites').insert(sitesData);
    })
    .then(() => {
      return knex('sites_users').insert(sitesUsersData);
    })
    .then(() => {
      const formatedMaps = formatMaps(mapsData);
      return knex('maps').insert(formatedMaps);
    })
    .then(() => {
      return knex('booklet').insert(bookletData);
    })
    .then(() => {
      return knex('questions').insert(questionsData);
    })
    .then(() => {
      return knex('site_users').insert(siteUsersData);
    })
    .then(() => {
      return knex('risk_level').insert(riskLevelData);
    })
    .then(() => {
      return knex('answers_options').insert(answersOptionsData);
    })
    .then(() => {
      return knex('site_specific').insert(siteSpecficData);
    })
    .then(() => {
      return knex('risks_answers').insert(riskAnswersData);
    });
};
