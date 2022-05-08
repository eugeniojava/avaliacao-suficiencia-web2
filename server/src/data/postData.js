const database = require('../infra/database');

exports.findAll = function () {
  return database.query(
    `SELECT p.id AS id,
            p.title AS title,
            p.content AS content,
            p.user_id AS "userId",
            u."login" AS login
    FROM "posts" p
    JOIN "users" u ON u.id = p.user_id
    `
  );
};

exports.findByTitleAndContentLike = function (filter) {
  return database.query(
    `SELECT p.id AS id,
            p.title AS title,
            p.content AS content,
            p.user_id AS "userId",
            u."login" AS login
    FROM "posts" p
    JOIN "users" u ON u.id = p.user_id
    WHERE p."title" LIKE $1
          OR p."content" LIKE $1
    `,
    [`%${filter}%`]
  );
};

exports.findByAuthor = function (author) {
  return database.query(
    `SELECT p.id AS id,
            p.title AS title,
            p.content AS content,
            p.user_id AS "userId",
            u."login" AS login
     FROM "posts" p
     JOIN "users" u ON u.id = p.user_id
     WHERE u.login = $1
  `,
    [author]
  );
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
    'INSERT INTO "posts" ("title", "content", "user_id", "image_name", "video_name") VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [post.title, post.content, post.userId, post.imageName, post.videoName]
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
