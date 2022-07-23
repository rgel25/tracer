const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/", async (req, res) => {
  // COMMENT THIS OUT IF YOU WANT TO TEST A USER FROM DB
  // const user = req.user;
  // USE THIS TO BY PASS LOGIN AND USE A DUMMY USER
  const user = {
    first_name: "argel",
    last_name: "miralles",
  };
  const roles = [
    { code: "ur1", name: "Admin" },
    { code: "ur2", name: "Project Manager" },
    { code: "ur3", name: "Developer" },
    { code: "ur4", name: "Submitter" },
    { code: "ur5", name: "Unassigned" },
  ];
  const users = await db.user.findAll();
  res.render("pages/user/index", { user, roles, users });
});

router.patch("/", async (req, res) => {
  const { id, role } = req.body;
  await db.user.update(
    {
      userRoleRefId: role,
    },
    {
      where: {
        id: id,
      },
    }
  );

  //   NEEDS SEPARATE LOGIC WHEN A USER EDITS ITS OWN ROLE; SIGNOUT TO REFRESH SESSION WITH NEW ROLE
  req.flash("success", "Role Update Successful!");
  return res.redirect("/dashboard/user");
});

router.get("/account", (req, res) => {
  // COMMENT THIS OUT IF YOU WANT TO TEST A USER FROM DB
  //   const currentUser = req.user;
  // USE THIS TO BY PASS LOGIN AND USE A DUMMY USER
  const user = {
    first_name: "hardcodedfirstname",
    last_name: "hardcodedlastname",
    email: "harcodedemail",
  };
  return res.render("pages/user/account", { user });
});

module.exports = router;
