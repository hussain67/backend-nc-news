const { selectArticles, selectArticleById } = require("../models/article.model");

exports.getArticles = (req, res, next) => {
  selectArticles().then(articles => {
    res.status(200).send({ articles });
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
  //{ inc_votes: newVote }`
};
