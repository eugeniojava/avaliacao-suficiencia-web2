const database = require('../infrastructure/database');

exports.findAll = function () {
  return database.query('SELECT * FROM posts');
};
