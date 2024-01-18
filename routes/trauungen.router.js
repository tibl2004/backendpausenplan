const express = require("express");
const router = express.Router();

const trauungenController = require("../controller/trauungen.controller");

router.get("/", trauungenController.getAll);
router.get("/:id", trauungenController.getById);
router.post("/", trauungenController.create);
router.put("/:id", trauungenController.update);
router.delete("/:id", trauungenController.delete);

module.exports = router;
