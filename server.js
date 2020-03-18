const express = require('express');

const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const db = require('./db');

// empty comment

db.on('open', () => {
  console.log('=> connected to mongodb');
});

db.on(
  'error',
  console.error.bind(console, 'MongoDB connection error: '),
);

const app = express();
const PORT = 5000;

app.set('view engine', 'ejs');

// set up routes
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
