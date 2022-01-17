const db = require("../connection");
const seed = data => {
  const { articleData, commentData, topicData, userData } = data;
  // 1. create tables
  return db
    .query(`DROP TABLE IF EXISTS comments`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS articles`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS topics`);
    })
    .then(() => {
      return db.query(`CREATE TABLE topics (
      slug TEXT UNIQUE PRIMARY KEY,
      description  TEXT NOT NULL
    );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE users (
      username VARCHAR(60) UNIQUE PRIMARY KEY,
      avatar_url TEXT,
      name TEXT NOT NULL

      );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE articles (
        article_id SERIAL PRIMARY KEY,
        title VARCHAR(60) NOT NULL,
        body TEXT NOT NULL,
        votes INT DEFAULT 0,
        topic TEXT REFERENCES topics(slug),
        author VARCHAR(60) REFERENCES users(username),
        created_at TIMESTAMP DEFAULT NOW()
      );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY,
        author VARCHAR(60) REFERENCES users(username),
        votes INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW(),
        body TEXT NOT NULL


      );`);
    });

  // 2. insert data
};

module.exports = seed;
