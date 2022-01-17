const db = require("../connection");
const seed = data => {
  const { articleData, commentData, topicData, userData } = data;
  // 1. create tables

  console.log(articleData);

  // 2. insert data
};

module.exports = seed;
