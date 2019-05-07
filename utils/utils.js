const bcrypt = require('bcrypt');

exports.formatUsers = rawUsers => {
  return rawUsers.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 10)
  }));
};

exports.formatMaps = rawMaps => {
  return rawMaps.map(map => ({
    ...map,
    coordinates: JSON.stringify(map.coordinates)
  }));
};
