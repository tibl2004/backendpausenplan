const express = require("express");
const router = express.Router();

const PausenController = require("../controller/pausen.controller");

router.get("/", PausenController.getAll);
router.get("/:id", PausenController.getById);
router.post("/", PausenController.create);
router.put("/:id", PausenController.update);
router.delete("/:id", PausenController.delete);

module.exports = router;
