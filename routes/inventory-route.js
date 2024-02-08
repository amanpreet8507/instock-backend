const router = require("express").Router();
const inventoryController = require("../contorllers/inventory-controller");

router.route("/:id/inventories").get(inventoryController.inventories);

module.exports = router;
