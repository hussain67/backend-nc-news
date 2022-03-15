const express = require("express");
const router = express.Router();

const { deleteCommentById, patchCommentById } = require("../controllers/comment.controller");

router.delete("/:comment_id", deleteCommentById);
router.patch("/:comment_id", patchCommentById);

module.exports = router;
