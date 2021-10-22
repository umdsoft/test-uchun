const express = require("express");
const router = express.Router();
const File = require("../controllers/FileController");
const uploader = require("../utils/uploader");

router.post("/create",uploader.single('file'), File.create);

module.exports = router;
