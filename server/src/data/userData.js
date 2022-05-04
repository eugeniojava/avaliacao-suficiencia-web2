const database = require('../infrastructure/database');

exports.create = function (user) {
  return database.one(
    'INSERT INTO users (login, email, password) VALUES ($1, $2, $3) RETURNING login, email',
    [user.login, user.email, user.password]
  );
};
