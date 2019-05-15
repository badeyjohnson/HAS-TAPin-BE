const config = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE
};

if (
  process.env.INSTANCE_CONNECTION_NAME &&
  process.env.NODE_ENV === 'production'
) {
  config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
}

const dbConfig =
  process.env.NODE_ENV === 'production'
    ? { client: 'mysql', connection: config }
    : require('../knexfile');

module.exports = require('knex')(dbConfig);
