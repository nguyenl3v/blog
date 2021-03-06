const express = require("express");
const user = require("../controller/user");
const auth = require("../middleware/auth").auth;
const router = express.Router();

router.post("/login", user.login);
router.get("/profile", auth, user.profile);
router.get("/verymail/:id", user.veryfileMail);

module.exports = router;
