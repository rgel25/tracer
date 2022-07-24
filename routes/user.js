const express = require("express");
const router = express.Router();
const user = require("../controllers/user");
const { isAdmin, isLoggedIn } = require("../middlewares/middleware");

router.get("/", isLoggedIn, isAdmin, user.renderUserPage);

router.patch("/", isLoggedIn, isAdmin, user.updateRole);

router.get("/account", isLoggedIn, user.renderAccountPage);

module.exports = router;
