const express = require("express");
const router = express.Router();
const User = require("../controllers/UserController");

router.post("/register", User.register);
router.post("/login", User.login);
router.get("/all", User.getAll);
router.get("/my", User.my);
router.put("/edit/:id", User.edit);

module.exports = router;
