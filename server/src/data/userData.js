const database = require('../infra/database');

exports.findByLogin = function (login) {
  return database.oneOrNone('SELECT * FROM "users" WHERE "login" = $1', [
    login,
  ]);
};

exports.save = function (user) {
  return database.one(
    'INSERT INTO users (login, email, password) VALUES ($1, $2, $3) RETURNING login, email',
    [user.login, user.email, user.password]
  );
};

exports.existsByLogin = function (login) {
  return database.oneOrNone('SELECT * FROM "users" WHERE "login" = $1', [
    login,
  ]);
};

exports.existsByEmail = function (email) {
  return database.oneOrNone('SELECT * FROM "users" WHERE "email" = $1', [
    email,
  ]);
};

exports.deleteByLogin = function (login) {
  return database.none('DELETE FROM "users" WHERE "login" = $1', [login]);
};
