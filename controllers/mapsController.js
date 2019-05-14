const { getMap } = require('../models/mapModels');

exports.fetchMap = (req, res, next) => {
  getMap(req.params).then(map => {
    res.status(200).json({ map });
  });
};
