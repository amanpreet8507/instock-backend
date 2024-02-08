const router = require("express").Router();
const inventoryController = require("../contorllers/inventory-controller");

router.route("/:id/inventories").get(inventoryController.inventories);

    
// For -----> GET /api/inventories/:id
router.route("/:id")
    .get(inventoryController.inventories)
    .put(inventoryController.editInventory)
module.exports = router;
