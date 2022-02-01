const express = require("express");
const router = express.Router();

//const getApi = require("../controllers/api.controller");

router.get("/", (req, res) => res.json("Hello, if you see this message that means your backend is up and running successfully. Congrats! Now let's continue learning React!"));

module.exports = router;
