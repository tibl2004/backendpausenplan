// routes/message.router.js
const express = require('express');
const router = express.Router();
const messageController = require('../controller/message.controller');

router.get("/:ticketId", messageController.getByTicketId);

module.exports = router;
