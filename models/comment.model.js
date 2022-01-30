const db = require("../db/connection");
const format = require("pg-format");

exports.selectCommentsByArticleId = article_id => {
  //console.log(article_id);
  return db
    .query(
      `
SELECT * FROM comments
WHERE article_id = $1 
  `,
      [article_id]
    )
    .then(result => {
      console.log(result.rows);
      return result.rows;
    });
};

exports.removeCommentById = comment_id => {
  return db
    .query(
      `
 DELETE FROM comments
 WHERE comment_id = $1
 RETURNING *
 `,
      [comment_id]
    )
    .then(result => {
      return result.rowCount;
    });
};

exports.insertCommentById = (article_id, username, body) => {
  const insertComments = format(
    `
  INSERT INTO comments
  (author, article_id, votes, created_at, body)
  VALUES
  %L
  RETURNING *
  `,

    [[username, article_id, 0, new Date(), body]]
  );

  return db.query(insertComments).then(result => {
    //console.log(res.rows);
    return result.rows[0];
  });
};
