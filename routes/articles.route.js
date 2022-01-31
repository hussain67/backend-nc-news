const express = require("express");
const router = express.Router();

const { getArticles, getArticleById, patchArticleById, getCommentsByArticleId, postCommentById } = require("../controllers/article.controller");

router.get("/", getArticles);
router.get("/:article_id", getArticleById);

router.patch("/:article_id", patchArticleById);
router.get("/:article_id/comments", getCommentsByArticleId);
router.post("/:article_id/comments", postCommentById);

module.exports = router;
