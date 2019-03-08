const moment = require('moment');

const logger = (req, res, next) => {
  console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
  //http://localhost:5000/api/members: 2019-03-07T17:34:47-05:00
  next();
};

module.exports = logger;
