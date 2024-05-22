// routes/ticket.router.js
const express = require('express');
const router = express.Router();
const ticketController = require('../controller/ticket.controller');

router.post("/", ticketController.create);
router.get("/", ticketController.getAll);
router.get("/:id", ticketController.getById);
router.put("/:id", ticketController.update);
router.delete("/:id", ticketController.delete);

module.exports = router;
