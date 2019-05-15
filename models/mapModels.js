const connection = require('../db/connection');

exports.getMap = ({ site_id }) => {
  return connection
    .select('*')
    .from('maps')
    .where({ site_id });
};
exports.postMap = ({ site_id }, { coordinates }) => {
  return connection
    .insert({
      site_id,
      coordinates: JSON.stringify(coordinates)
    })
    .into('maps');
};
