const express = require("express");
const folder = require("../controllers/folder");

const router = express.Router();

router.post("/getFolder", folder.getFolder);

router.get("/getFiles/:fileName", folder.getFiles);

module.exports = router;
