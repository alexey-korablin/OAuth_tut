const mongoose = require('mongoose');

const keys = require('../config/keys');
const options = require('../config/db-options');

mongoose.connect(keys.mongodb.dbURI, options).catch(e => {
  console.error(`Connection error ${e.message}`);
});

const db = mongoose.connection;

module.exports = db;
