const db = require("../db/connection");
const { formatAllowedTopics } = require("../utils/seed-formatting");

exports.selectArticles = reqQuery => {
  const { sort_by = "created_at", order_by = "DESC", topic } = reqQuery;

  const allowedSortBy = ["article_id", "title", "body", "votes", "created_at", "topic", "author", "comment_count"];
  const allowedOrderBy = ["ASC", "asc", "DESC", "desc"];
  const allowedTopics = ["mitch", "cats", "paper"]; //Need to make dynamic

  let queryStr = ` 
  SELECT articles.*, COUNT(comments.article_id) AS comment_count
  FROM articles
  Left JOIN comments ON comments.article_id = articles.article_id
  `;

  if (topic) {
    if (allowedTopics.includes(topic)) {
      queryStr += ` 
            WHERE topic=$1
            GROUP BY articles.article_id`;
      return db.query(queryStr, [topic]).then(result => {
        return result.rows;
      });
    } else {
      return Promise.resolve([]);
    }
  } else if (!allowedSortBy.includes(sort_by) || !allowedOrderBy.includes(order_by)) {
    return Promise.resolve([]);
  } else {
    queryStr += `
    GROUP BY articles.article_id
    ORDER BY ${sort_by} ${order_by}
    `;
    return db.query(queryStr).then(res => {
      return res.rows;
    });
  }
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
