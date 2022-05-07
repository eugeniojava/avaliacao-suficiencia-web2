const database = require('../infra/database');

exports.findByLogin = function (login) {
  return database.one('SELECT * FROM users WHERE login = $1', [login]);
};

exports.create = function (user) {
  return database.one(
    'INSERT INTO users (login, email, password) VALUES ($1, $2, $3) RETURNING login, email',
    [user.login, user.email, user.password]
  );
};
