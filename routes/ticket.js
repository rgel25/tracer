const express = require("express");
const router = express.Router();
const ticket = require("../controllers/ticket");
const { isLoggedIn, allowedRoles, isAdmin } = require("../middlewares/middleware");

router.get('/', isLoggedIn, allowedRoles(["ur1", "ur2", "ur3", "ur4"]), ticket.tickets); // render index
router.get('/details/:id', isLoggedIn, allowedRoles(["ur1", "ur2", "ur3", "ur4"]), ticket.ticketDetails); // render ticket details page

router.get('/updateTicket/:id', isLoggedIn, allowedRoles(["ur1", "ur2", "ur3", "ur4"]), ticket.getTicket); // render update ticket page
router.post('/updateTicket', isLoggedIn, allowedRoles(["ur1", "ur2", "ur3", "ur4"]), ticket.updateTicket);

router.get('/addTicket', isLoggedIn, allowedRoles(["ur1", "ur2", "ur3", "ur4"]), ticket.renderAddTicketPage); // render add ticket page
router.post('/addTicket', isLoggedIn, allowedRoles(["ur1", "ur2", "ur3", "ur4"]), ticket.addTicket);

router.get('/myTicket', isLoggedIn, allowedRoles(["ur3", "ur4"]), ticket.renderMyTicketPage); // render my ticket page
router.get('/archive', isLoggedIn, allowedRoles(["ur1", "ur2", "ur3", "ur4"]), ticket.renderArchivedTicketPage); // render archived ticket page

router.post('/comment/new', isLoggedIn, allowedRoles(["ur1", "ur2", "ur3", "ur4"]), ticket.addComment);

router.post('/assign/developer', isLoggedIn,allowedRoles(["ur1", "ur2", "ur3", "ur4"]), ticket.assignDeveloper);

router.delete('/:id/delete', isLoggedIn, isAdmin, ticket.deleteTicket);

router.post('/:id/archive', isLoggedIn,allowedRoles(["ur1", "ur2"]), ticket.archiveTicket); // archive ticket


module.exports = router;
