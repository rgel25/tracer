const express = require("express");
const router = express.Router();
const project = require("../controllers/project");

router.get('/', project.projects);

router.get('/new', project.renderNewProjectForm);
router.post('/', project.newProject);

router.get('/:id/update', project.renderUpdateProjectForm);
router.put('/:id/update', project.updateProject);

router.delete('/:id/delete', project.deleteProject);

router.get('/:id/view', project.viewProject);
router.post('/assignManager', project.assignProjectManager);

router.put('/', project.archiveProject);
router.get('/archive', project.archivedProjects);

module.exports = router;