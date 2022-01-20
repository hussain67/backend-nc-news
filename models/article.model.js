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
  return db
    .query(
      `
   SELECT * FROM articles
   WHERE article_id =$1 
   `,
      [article_id]
    )
    .then(article => {
      //console.log(article);
      return article.rows[0];
    });
};
/*ALTER TABLE books
ADD author_id INT
REFERENCES authors(author_id);

SELECT * FROM books
*/
