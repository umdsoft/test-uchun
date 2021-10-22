const express = require("express");
const router = express.Router();
const Document = require("../controllers/DocumentController");

router.post("/create", Document.create);
router.get("/my", Document.myDocument);
router.get("/:id", Document.OneDocument);

module.exports = router;
