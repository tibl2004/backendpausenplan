const express = require("express");
const router = express.Router();

const auftraegeController = require("../controller/auftraege.controller");

router.get("/", auftraegeController.getAll);
router.get("/:id", auftraegeController.getById);
router.post("/", auftraegeController.create);
router.put("/:id", auftraegeController.update);
router.delete("/:id", auftraegeController.delete);

module.exports = router;
