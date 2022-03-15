const { removeCommentById, updateCommentById } = require("../models/comment.model");

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

exports.patchCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;

  return updateCommentById(comment_id, inc_votes)
    .then(comment => {
      if (comment) {
        res.status(200).send({ comment });
      } else {
        return Promise.reject({ status: 404, msg: `No article found with comment_id: ${comment_id}` });
      }
    })
    .catch(err => {
      next(err);
    });
};
