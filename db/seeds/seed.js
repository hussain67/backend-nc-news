const db = require("../connection");
const format = require("pg-format");
const { formatTopicData, formatUserData, formatArticleData, formatCommentData } = require("../../utils/seed-formatting");
const seed = data => {
  const { articleData, commentData, topicData, userData } = data;

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
      const formatedTopics = formatTopicData(topicData);
      const insertTopics = format(
        `
      INSERT INTO topics
      (slug, description)
      VALUES
      %L
      RETURNING *
      `,
        formatedTopics
      );
      return db.query(insertTopics);
    })
    .then(() => {
      return db.query(`CREATE TABLE users (
      username VARCHAR(30) UNIQUE PRIMARY KEY,
      avatar_url TEXT NOT NULL,
      name TEXT NOT NULL
      );`);
    })
    .then(() => {
      const formattedUsers = formatUserData(userData);
      const insertUsers = format(
        `
      INSERT INTO users
      (username, avatar_url, name)
      VALUES
      %L
      RETURNING *
      `,
        formattedUsers
      );
      return db.query(insertUsers);
    })

    .then(() => {
      return db.query(`CREATE TABLE articles (
        article_id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        body TEXT NOT NULL,
        votes INT DEFAULT 0 NOT NULL,
        topic TEXT REFERENCES topics(slug) NOT NULL,
        author VARCHAR(60) REFERENCES users(username) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );`);
    })
    .then(() => {
      const formattedArticles = formatArticleData(articleData);
      const insertArticles = format(
        `
      INSERT INTO articles
      (title, body, votes, topic, author, created_at)
      VALUES
      %L
      RETURNING *
      `,
        formattedArticles
      );
      return db.query(insertArticles);
    })
    .then(() => {
      return db.query(`CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY,
        author VARCHAR(60) REFERENCES users(username) NOT NULL,
        article_id INT REFERENCES articles(article_id) NOT NULL,
        votes INT DEFAULT 0 NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        body TEXT NOT NULL

      );`);
    })
    .then(() => {
      const formattedComments = formatCommentData(commentData);
      const insertComments = format(
        `
      INSERT INTO comments
      (author, article_id, votes, created_at, body)
      VALUES
      %L
      RETURNING *
      `,
        formattedComments
      );
      return db.query(insertComments);
    });
};

module.exports = seed;
