const express = require("express");
const router = express.Router();
const ticket = require("../controllers/ticket");

router.get('/', ticket.tickets); // render index
router.get('/details/:id', ticket.ticketDetails); // render ticket details page

router.get('/updateTicket/:id', ticket.getTicket); // render update ticket page
router.post('/updateTicket', ticket.updateTicket);

router.get('/addTicket', ticket.renderAddTicketPage); // render add ticket page
router.post('/addTicket', ticket.addTicket);

router.get('/myTicket', ticket.renderMyTicketPage); // render add ticket page
router.get('/myTicket/archived', ticket.renderArchivedTicketPage); // render archived ticket page

router.post('/comment/new', ticket.addComment);

router.post('/assign/developer', ticket.assignDeveloper);

router.delete('/:id/delete', ticket.deleteTicket);


module.exports = router;
