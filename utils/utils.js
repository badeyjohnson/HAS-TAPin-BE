const bcrypt = require('bcrypt');
const fs = require('fs');
const zlib = require('zlib');

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

exports.formatPDF = () => {
  const data = fs.readFileSync('db/data/H-S-Booklet.PDF');
  const deflated = zlib.deflateSync(data).toString('base64');
  return deflated;
};

exports.bufferPDF = deflated => {
  const inflated = zlib.inflateSync(
    Buffer.from((deflated, 'base64')).toString()
  );
  return inflated;
};
