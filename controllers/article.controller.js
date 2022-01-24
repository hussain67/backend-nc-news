const { selectArticles, selectArticleById, updateArticleById } = require("../models/article.model");

exports.getArticles = (req, res, next) => {
  //const { sort_by } = req.query;
  selectArticles(req.query)
    .then(articles => {
      if (articles.length > 0) {
        res.status(200).send({ articles });
      } else {
        return Promise.reject({ status: 400, msg: "Not Found" });
      }
    })
    .catch(err => {
      next(err);
    });
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then(article => {
      if (article) {
        res.status(200).send({ article });
      } else {
        return Promise.reject({ status: 404, msg: `No article found with article_id: ${article_id}` });
      }
    })
    .catch(err => {
      next(err);
    });
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  return updateArticleById(article_id, inc_votes)
    .then(article => {
      if (article) {
        res.status(200).send({ article });
      } else {
        return Promise.reject({ status: 404, msg: `No article found with article_id: ${article_id}` });
      }
    })
    .catch(err => {
      next(err);
    });
};
