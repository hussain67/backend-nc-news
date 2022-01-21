const db = require("../db/connection");

exports.selectArticles = () => {
  return db
    .query(
      `
   SELECT * FROM articles
   `
    )
    .then(res => {
      return res.rows;
    });
};

exports.selectArticleById = article_id => {
  let data = `SELECT articles.*, COUNT(comments.article_id) AS comment_count
    FROM articles
    Left JOIN comments ON comments.article_id = articles.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id
   `;

  return db.query(data, [article_id]).then(article => {
    return article.rows[0];
  });
};

exports.updateArticleById = (article_id, inc_votes) => {
  return db
    .query(
      `
UPDATE articles
SET
votes = votes + $1
WHERE article_id = $2
RETURNING *
  `,
      [inc_votes, article_id]
    )
    .then(res => {
      return res.rows[0];
    });
};
