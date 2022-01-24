const db = require("../db/connection");
const { formatAllowedTopics } = require("../utils/seed-formatting");

exports.selectArticles = reqQuery => {
  const { sort_by = "created_at", order = "DESC", topic } = reqQuery;

  const allowedSortBy = ["article_id", "title", "body", "votes", "created_at", "topic", "author", "comment_count"];
  const allowedOrderBy = ["ASC", "asc", "DESC", "desc"];
  const allowedTopics = ["mitch", "cats", "paper"]; //Need to make dynamic

  if (topic) {
    if (allowedTopics.includes(topic)) {
      return db
        .query(
          `
    SELECT articles.*, COUNT(comments.article_id) AS comment_count
     FROM articles
     Left JOIN comments ON comments.article_id = articles.article_id
     WHERE topic=$1
    GROUP BY articles.article_id
    
   `,
          [topic]
        )
        .then(result => {
          return result.rows;
        });
    } else {
      return Promise.resolve([]);
    }
  } else if (!allowedSortBy.includes(sort_by) || !allowedOrderBy.includes(order)) {
    return Promise.resolve([]);
  } else {
    return db
      .query(
        `
      
    SELECT articles.*, COUNT(comments.article_id) AS comment_count
    FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id
    GROUP BY articles.article_id
    ORDER BY ${sort_by} ${order}
     
    `
      )
      .then(res => {
        // console.log(res.rows);
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
