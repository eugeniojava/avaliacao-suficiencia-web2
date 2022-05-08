const database = require('../infra/database');

exports.findAll = function () {
  return database.query(`SELECT * FROM "users"`);
};

exports.findAllHavingPost = function () {
  return database.query(
    `SELECT DISTINCT u.login FROM "users" u JOIN "posts" p ON p.user_id = u.id`
  );
};

exports.findById = function (userId) {
  return database.oneOrNone('SELECT * FROM "users" WHERE "id" = $1', [userId]);
};

exports.findByLogin = function (login) {
  return database.oneOrNone('SELECT * FROM "users" WHERE "login" = $1', [
    login,
  ]);
};

exports.save = function (user) {
  return database.one(
    'INSERT INTO users (login, email, password) VALUES ($1, $2, $3) RETURNING id, login, email',
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

exports.updateById = function (userId, user) {
  return database.none(
    'UPDATE "users" SET "login" = $1, "email" = $2 WHERE "id" = $3',
    [user.login, user.email, userId]
  );
};

exports.updateByIdAndPassword = function (userId, user) {
  return database.none(
    'UPDATE "users" SET "login" = $1, "email" = $2, "password" = $3 WHERE "id" = $4',
    [user.login, user.email, user.password, userId]
  );
};

exports.deleteByLogin = function (login) {
  return database.none('DELETE FROM "users" WHERE "login" = $1', [login]);
};
