const express = require("express");
const router = express.Router();
const auftraegeController = require("../controller/auftraege.controller");

// GET /api/v1/auftraege
router.get("/", auftraegeController.getAll);

// GET /api/v1/auftraege/:id
router.get("/:id", auftraegeController.getById);

// POST /api/v1/kunden/:kundenId/auftraege
router.post("/:kundenId", auftraegeController.create);

// PUT /api/v1/auftraege/:id
router.put("/:id", auftraegeController.update);

// DELETE /api/v1/auftraege/:id
router.delete("/:id", auftraegeController.delete);

module.exports = router;
