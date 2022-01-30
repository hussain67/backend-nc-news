const { selectCommentsByArticleId, removeCommentById, insertCommentById } = require("../models/comment.model");

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentById(comment_id)
    .then(rowCount => {
      if (!rowCount) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      } else {
        res.status(204).end();
      }
    })
    .catch(err => {
      next(err);
    });
};
exports.getCommentsByArticleId = (req, res, next) => {
  const article_id = req.params.article_id;
  selectCommentsByArticleId(article_id)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(err => {
      next(err);
    });
};

exports.postCommentById = (req, res, next) => {
  const article_id = req.params.article_id;
  const body = req.body.body;
  const username = req.body.username;

  insertCommentById(article_id, username, body)
    .then(post => {
      if (post) {
        res.status(201).send({ post });
      }
    })
    .catch(err => {
      next(err);
    });
};
