const express = require("express");
const app = express();

app.use(express.json());

const api = require("./routes/api.route");
const topics = require("./routes/topics.route");
const comments = require("./routes/comments.route");
const articles = require("./routes/articles.route");

const { handleInvalidUrlErrors, handleServerErrors, handlePsqlErrors, handleCustomErrors } = require("./error-handler/error");
app.use("/api", api);

app.use("/api/topics", topics);
app.use("/api/comments", comments);
app.use("/api/articles", articles);

app.all("*", handleInvalidUrlErrors);
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
