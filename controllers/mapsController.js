const { getMap, postMap } = require('../models/mapModels');

exports.fetchMap = (req, res, next) => {
  getMap(req.params).then(map => {
    res.status(200).json({ map });
  });
};
exports.sendMap = (req, res, next) => {
  postMap(req.params, req.body).then(map => {
    if (map) res.status(202).json({ response: 'Map created' });
    else next(res.status(400).json({ response: 'errored' }));
  });
};
