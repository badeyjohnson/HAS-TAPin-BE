const routes = require('../routes.json');

exports.getAllRoutes = (req, res, next) => {
  res.status(200).json({ routes });
};
