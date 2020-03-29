const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');

const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const db = require('./db');
const keys = require('./config/keys');

// working on db (mongodb) events
db.on('open', () => {
  console.log('=> connected to mongodb');
});

db.on(
  'error',
  console.error.bind(console, 'MongoDB connection error: '),
);

//  initialize node express application
const app = express();
const PORT = 5000;

// set up middlewares
// set up cookieSession middleware. The cookie will be actual for one
// day (86400000 msec = 24*60*60*1000) and it will be enc/dec by
// passed cookieKey
app.use(
  cookieSession({
    maxAge: 86400000,
    keys: [keys.sessions.cookieKey],
  }),
);
//  initialize passport
app.use(passport.initialize());
app.use(passport.session());

//  set up view engine
app.set('view engine', 'ejs');

// set up routes
// routes handle auth
app.use('/auth', authRoutes);
// routes handle profile
app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
  res.render('home');
});

// starting the app on certain port of localhost
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
