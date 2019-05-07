const {
  bookletData,
  jobsData,
  mapsData,
  sitesData,
  usersData
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
      const formatedMaps = formatMaps(mapsData);
      return knex('maps').insert(formatedMaps);
    })
    .then(() => {
      return knex('booklet').insert(bookletData);
    });
};
