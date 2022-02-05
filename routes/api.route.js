const express = require("express");
const router = express.Router();

const { getHomePage, getApi } = require("../controllers/api.controller");

router.get("/", getHomePage);
router.get("/api", getApi);

module.exports = router;
