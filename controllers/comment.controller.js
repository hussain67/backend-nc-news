const { removeCommentById } = require("../models/comment.model");

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
