const express = require("express");
const router = express.Router();
const project = require("../controllers/project");
const { isLoggedIn, allowedRoles, isAdmin } = require("../middlewares/middleware");

router.get("/", isLoggedIn, allowedRoles(["ur1", "ur2", "ur3"]), project.projects);

router.get("/new", isLoggedIn, allowedRoles(["ur1", "ur2"]), project.renderNewProjectForm);
router.post("/", isLoggedIn, allowedRoles(["ur1", "ur2"]), project.newProject);

router.get("/:id/update", isLoggedIn, allowedRoles(["ur1", "ur2"]), project.renderUpdateProjectForm);
router.put("/:id/update", isLoggedIn, allowedRoles(["ur1", "ur2"]), project.updateProject);

router.delete("/:id/delete", isLoggedIn, isAdmin, project.deleteProject);

router.get("/:id/view", isLoggedIn, allowedRoles(["ur1", "ur2", "ur3"]), project.viewProject);
router.post("/assignManager", isLoggedIn, allowedRoles(["ur1", "ur2"]), project.assignProjectManager);

router.get("/archive", isLoggedIn, allowedRoles(["ur1", "ur2", "ur3"]), project.archivedProjects);
router.put("/:id/archive", isLoggedIn, allowedRoles(["ur1", "ur2"]), project.archiveProject);

router.get("/myProject", isLoggedIn, allowedRoles(["ur1", "ur2"]), project.renderMyProjectPage);

module.exports = router;
