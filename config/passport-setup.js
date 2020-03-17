const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('./keys');

// register strategy middleware
passport.use(
  new GoogleStrategy(
    {
      // Options for the google strategy
      callbackURL: '/auth/google/redirect',
      clientID: keys.google.clientId,
      clientSecret: keys.google.clientSecret,
    },
    (accessToken, refreshToken, profile, done) => {
      // passport callback function
      console.log(`Passport callback function fired`);
      console.log(profile);
    },
  ),
);
