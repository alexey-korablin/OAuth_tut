const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

const keys = require('./keys');

passport.serializeUser((user, done) => {
  // done is error-first function
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

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
      User.findOne({ googleId: profile.id }).then(currentUser => {
        if (currentUser) {
          console.log('Existing user => ', currentUser);
          // done is error-first function
          done(null, currentUser);
        } else {
          new User({
            googleId: profile.id,
            name: profile.displayName,
          })
            .save()
            .then(user => {
              console.log(user);
              done(null, user);
            });
        }
      });
    },
  ),
);
