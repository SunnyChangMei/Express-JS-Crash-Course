const express = require('express');
const path = require('path');
const expHBS = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');

const app = express();

//! Init middleware
// app.use(logger);

//! Handlebars Middleware
app.engine('handlebars', expHBS({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//! Body Parser Middleware remember USE ()
app.use(express.json());
//! handle URL code data
app.use(express.urlencoded({
  extended: false
}));

//! Homepage route
app.get('/', (req, res) => res.render('index', {
  title: 'Member App',
  members
}));

//! Set static folder or MOVE static page above homepage route
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/members', require('./routes/api/members'));

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
