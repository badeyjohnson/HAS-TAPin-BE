const connection = require('../db/connection');

exports.getMap = ({ site_id }) => {
  return connection
    .select('*')
    .from('maps')
    .where({ site_id });
};
