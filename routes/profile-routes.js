const router = require('express').Router();

// the middleware to check if user already authenticated
const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect('/auth/login');
  } else {
    next();
  }
};

// the route to the user's profile page
router.get('/', authCheck, (req, res) => {
  res.render('profile', { user: req.user });
});

module.exports = router;
