const express = require("express");
const router = express.Router();

//const getApi = require("../controllers/api.controller");

router.get("/", (req, res) => res.json(" Welcome to the be_nc_api"));

module.exports = router;
