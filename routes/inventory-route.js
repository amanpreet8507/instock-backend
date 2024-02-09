const router = require("express").Router();
const inventoryController = require("../contorllers/inventory-controller");

// FOR -----> GET /api/warehouses/:id/inventories
router.route("/:id/inventories").get(inventoryController.allInventories);

// For -----> GET /api/inventories/:id
router
  .route("/:id")
  .get(inventoryController.inventoriesById)
  .put(inventoryController.editInventory);

// For -----> POST /api/inventories
router.route("/").post(inventoryController.postInventory);

module.exports = router;
