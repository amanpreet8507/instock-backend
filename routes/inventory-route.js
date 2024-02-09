const router = require("express").Router();
const inventoryController = require("../controllers/inventory-controller");

// FOR -----> GET /api/warehouses/:id/inventories
router.route("/:id/inventories")
    .get(inventoryController.allInventories);

    
// For -----> GET /api/inventories/:id
router.route("/:id")
    .get(inventoryController.inventoriesById)
    .put(inventoryController.editInventory)
module.exports = router;