const express = require("express");
const router = express.Router();

const anmeldungenController = require("../controller/anmeldungen.controller");

router.get("/", anmeldungenController.getAll);
router.get("/:id", anmeldungenController.getById);
router.post("/", anmeldungenController.create);
router.put("/:id", anmeldungenController.update);
router.delete("/:id", anmeldungenController.delete);

module.exports = router;
