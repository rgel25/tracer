const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // COMMENT THIS OUT IF YOU WANT TO TEST A USER FROM DB
  // const user = req.user;
  // USE THIS TO BY PASS LOGIN AND USE A DUMMY USER
  const user = {
    first_name: "argel",
    last_name: "miralles",
  };
  res.render("pages/dashboard/index", { user });
});
module.exports = router;
