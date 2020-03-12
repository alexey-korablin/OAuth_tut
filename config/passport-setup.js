const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

// register strategy middleware
passport.use(new GoogleStrategy({}), () => {});
