const database = require('../infra/database');

exports.findAll = function () {
  return database.query('SELECT * FROM "posts"');
};

exports.findById = function (postId) {
  return database.oneOrNone('SELECT * FROM "posts" WHERE "id" = $1', [postId]);
};

exports.findByTitle = function (title) {
  return database.oneOrNone('SELECT * FROM "posts" WHERE "title" = $1', [
    title,
  ]);
};

exports.save = function (post) {
  return database.one(
    'INSERT INTO "posts" ("title", "content") VALUES ($1, $2) RETURNING *',
    [post.title, post.content]
  );
};

exports.updateById = function (postId, post) {
  return database.none(
    'UPDATE "posts" SET "title" = $1, "content" = $2 WHERE "id" = $3',
    [post.title, post.content, postId]
  );
};

exports.deleteById = function (postId) {
  return database.none('DELETE FROM "posts" WHERE "id" = $1', [postId]);
};
