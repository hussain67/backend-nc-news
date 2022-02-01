const express = require("express");
const router = express.Router();

const getApi = require("../controllers/api.controller");

router.get("/", getApi);

module.exports = router;
