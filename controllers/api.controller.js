const apiInfo = require("../endpoints.json");

exports.getHomePage = (req, res, next) => {
  return res.status(200).send({ msg: "Welcome to the api" });
};

exports.getApi = (req, res, next) => {
  return res.status(200).send({ apiInfo });
};
