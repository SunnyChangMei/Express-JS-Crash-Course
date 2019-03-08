const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');

const app = express();

//! Init middleware
// app.use(logger);

//! Body Parser Middleware remember USE ()
app.use(express.json());
//! handle URL code data
app.use(express.urlencoded({ extended: false}));

//! set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/members', require('./routes/api/members'));

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
