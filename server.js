const express = require('express');

const authRoutes = require('./routes/auth-routes');

const app = express();
const PORT = 5000;

app.set('view engine', 'ejs');

// set up routes
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
