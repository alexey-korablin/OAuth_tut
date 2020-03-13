const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const keys = require('./keys');

// register strategy middleware
passport.use(
  new GoogleStrategy(
    {
      // Options for the google strategy
      callbackURL: 'auth/google/redirect',
      clientID: keys.google.clientId,
      clientSecret: keys.google.clientSecret,
    },
    () => {
      // passport callback function
    },
  ),
);
