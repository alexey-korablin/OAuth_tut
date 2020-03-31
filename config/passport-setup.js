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
      User.findOne({ googleId: profile.id }).then(currentUser => {
        if (currentUser) {
          // done is error-first function
          done(null, currentUser);
        } else {
          new User({
            googleId: profile.id,
            name: profile.displayName,
            thumbnail: profile._json.picture,
          })
            .save()
            .then(user => {
              done(null, user);
            });
        }
      });
    },
  ),
);
