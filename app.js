const express = require('express');
const path = require('path');
const moment = require('moment');
const members = require('./Members');

const app = express();

const logger = (req, res, next) => {
  console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
  //http://localhost:5000/api/members: 2019-03-07T17:34:47-05:00
  next();
};

//! Init middleware
app.use(logger);

  //! Get all members
app.get('/api/members', function (req, res) {
  res.json(members);
});

//! set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
