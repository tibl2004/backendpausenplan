const express = require("express");
const router = express.Router();

const kundenController = require("../controller/kunden.controller");

router.get("/", kundenController.getAll);
router.get("/:id", kundenController.getById);
router.post("/", kundenController.create);
router.put("/:id", kundenController.update);
router.delete("/:id", kundenController.delete);

module.exports = router;
