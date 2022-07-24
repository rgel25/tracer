-- REFERENCE_CODE
INSERT INTO `reference_codes` VALUES 
('pp1','P1 - Urgent',1,'Project Priority','pp','2022-07-18 17:52:30','2022-07-18 09:52:30'),
('pp2','P2 - High',2,'Project Priority','pp','2022-07-18 17:52:30','2022-07-18 09:52:30'),
('pp3','P3 - Medium',3,'Project Priority','pp','2022-07-18 17:52:30','2022-07-18 09:52:30'),
('pp4','P4 - Low',4,'Project Priority','pp','2022-07-18 17:52:30','2022-07-18 09:52:30'),
('ps1','New',1,'Project Status','ps','2022-07-18 17:52:30','2022-07-18 09:52:30'),
('ps2','Development',2,'Project Status','ps','2022-07-18 17:52:30','2022-07-18 09:52:30'),
('ps3','Archived',3,'Project Status','ps','2022-07-18 17:52:30','2022-07-18 09:52:30'),
('tp1','P1 - Urgent',1,'Ticket Priority','tp','2022-07-18 17:52:30','2022-07-18 09:52:30'),
('tp2','P2 - High',2,'Ticket Priority','tp','2022-07-18 17:52:30','2022-07-18 09:52:30'),
('tp3','P3 - Medium',3,'Ticket Priority','tp','2022-07-18 17:52:30','2022-07-18 09:52:30'),
('tp4','P4 - Low',4,'Ticket Priority','tp','2022-07-18 17:52:30','2022-07-18 09:52:30'),
('ts1','Unassigned',1,'Ticket Status','ts','2022-07-18 17:52:30','2022-07-18 09:52:30'),
('ts2','Assigned',2,'Ticket Status','ts','2022-07-18 17:52:30','2022-07-18 09:52:30'),
('ts3','Testing',3,'Ticket Status','ts','2022-07-18 17:52:30','2022-07-18 09:52:30'),
('ts4','Closed',4,'Ticket Status','ts','2022-07-18 17:52:30','2022-07-18 09:52:30'),
('ts5','Archived',5,'Ticket Status','ts','2022-07-18 17:52:30','2022-07-18 09:52:30'),
('tt1','Maintenance',1,'Ticket Type','tt','2022-07-18 17:52:30','2022-07-18 09:52:30'),
('tt2','UI',2,'Ticket Type','tt','2022-07-18 17:52:30','2022-07-18 09:52:30'),
('tt3','Runtime',3,'Ticket Type','tt','2022-07-18 17:52:30','2022-07-18 09:52:30'),
('tt4','New Development',4,'Ticket Type','tt','2022-07-18 17:52:30','2022-07-18 09:52:30'),
('ur1','Admin',1,'User Role','ur','2022-07-18 17:52:30','2022-07-18 09:52:30'),
('ur2','Project Manager',2,'User Role','ur','2022-07-18 17:52:30','2022-07-18 09:52:30'),
('ur3','Developer',3,'User Role','ur','2022-07-18 17:52:30','2022-07-18 09:52:30'),
('ur4','Submitter',4,'User Role','ur','2022-07-18 17:52:30','2022-07-18 09:52:30'),
('ur5','Unassigned',4,'User Role','ur','2022-07-18 17:52:30','2022-07-18 09:52:30');



-- USER ROLES - DEMO
INSERT INTO `users` VALUES 
(1,'Admin','Demo','admin@test.com', '123456', 'ur1', '2022-07-24 12:00:00', '2022-07-24 12:00:01'),
(2,'Manager','Demo','manager@test.com', '123456', 'ur2', '2022-07-24 12:00:00', '2022-07-24 12:00:01'),
(3,'Developer','Demo','dev@test.com', '123456', 'ur3', '2022-07-24 12:00:00', '2022-07-24 12:00:01'),
(4,'Submitter','Demo','submitter@test.com', '123456', 'ur4', '2022-07-24 12:00:00', '2022-07-24 12:00:01');


-- PROJECT 
INSERT INTO `projects` VALUES
(1, 'Talently', 'Mini Project 2', '2022-07-25', '2022-08-01', 'ps1', '2022-07-25 00:00:00', '2022-07-25 00:00:00', 'pp1', null),
(2, 'Coding Journal', 'Journal Created using Laravel', '2022-07-26', '2022-08-08', 'ps1', '2022-07-25 00:00:00', '2022-07-25 00:00:00', 'pp2', null),
(3, 'E-Magazine', 'Mini Project 1', '2022-07-26', '2022-08-05', 'ps1', '2022-07-25 00:00:00', '2022-07-25 00:00:00', 'pp3', null);

-- TICKET
INSERT INTO `tickets` VALUES
(1,'Ticket 1','Ticket Description 1', 1, 1,'ts1','2022-07-25 00:00:00','2022-07-25 00:00:01', 'tt1','tp1'),
(2,'Ticket 2','Ticket Description 2', 1, 2,'ts1','2022-07-25 00:00:00','2022-07-25 00:00:01', 'tt2','tp2'),
(3,'Ticket 3','Ticket Description 3', 1, 1,'ts1','2022-07-25 00:00:00','2022-07-25 00:00:01', 'tt3','tp3'),
(4,'Ticket 4','Ticket Description 4', 1, 1,'ts1','2022-07-25 00:00:00','2022-07-25 00:00:01', 'tt4','tp4'),
(5,'Ticket 5','Ticket Description 5', 1, 3,'ts1','2022-07-25 00:00:00','2022-07-25 00:00:01', 'tt1','tp1'),
(6,'Ticket 6','Ticket Description 6', 1, 2,'ts1','2022-07-25 00:00:00','2022-07-25 00:00:01', 'tt2','tp2'),
(7,'Ticket 7','Ticket Description 7', 1, 1,'ts1','2022-07-25 00:00:00','2022-07-25 00:00:01', 'tt3','tp3'),
(8,'Ticket 8','Ticket Description 8', 1, 2,'ts1','2022-07-25 00:00:00','2022-07-25 00:00:01', 'tt4','tp4'),
(9,'Ticket 9','Ticket Description 9', 1, 3,'ts1','2022-07-25 00:00:00','2022-07-25 00:00:01', 'tt1','tp1'),
(10,'Ticket 10','Ticket Description 10', 1, 1,'ts1','2022-07-25 00:00:00','2022-07-25 00:00:01', 'tt2','tp2');

