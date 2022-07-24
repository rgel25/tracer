const express = require("express");
const router = express.Router();
const dashboard = require("../controllers/dashboard");
const { isLoggedIn } = require("../middlewares/middleware");

router.get("/", isLoggedIn, dashboard.renderDashboard);

module.exports = router;
