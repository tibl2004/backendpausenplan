const express = require("express");
const router = express.Router();

const mitarbeiterController = require("../controller/mitarbeiter.controller");

router.get("/", mitarbeiterController.getAll);
router.get("/:id", mitarbeiterController.getById);
router.post("/", mitarbeiterController.create);
router.put("/:id", mitarbeiterController.update);
router.delete("/:id", mitarbeiterController.delete);

module.exports = router;
