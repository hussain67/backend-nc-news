const express = require("express");
const app = express();

app.use(express.json());

const { getTopics } = require("./controllers/topic.controller");
const { getArticles, getArticleById, patchArticleById } = require("./controllers/article.controller");
const { getCommentsByArticleId, deleteCommentById, postCommentById } = require("./controllers/comment.controller");

const { handleInvalidUrlErrors, handleServerErrors, handlePsqlErrors, handleCustomErrors } = require("./error-handler/error");

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleById);

app.patch("/api/articles/:article_id", patchArticleById);
app.delete("/api/comments/:comment_id", deleteCommentById);
app.get("/api/articles/:article_id/comments", getCommentsByArticleId);
app.post("/api/articles/:article_id/comments", postCommentById);

app.all("*", handleInvalidUrlErrors);
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
