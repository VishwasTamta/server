const express = require("express");
const folder = require("../controllers/folder");

const router = express.Router();

router.post("/getFolder", folder.getFolder);

module.exports = router;
