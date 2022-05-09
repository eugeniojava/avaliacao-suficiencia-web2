const pgPromise = require('pg-promise')();

const database = pgPromise({
  connectionString:
    process.env.DATABASE_URL ||
    `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
  ssl: null,
});

module.exports = database;
