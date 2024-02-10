const router = require("express").Router();
const inventoryController = require("../controllers/inventory-controller");

// FOR -----> GET /api/warehouses/:id/inventories
router.route("/:id/inventories").get(inventoryController.allInventories);

// For -----> GET, PUT, DELETE /api/inventories/:id
router
  .route("/:id")
  .get(inventoryController.inventoriesById)
  .put(inventoryController.editInventory)
  .delete(inventoryController.deleteInventory)

// For -----> GET, POST /api/inventories

router.
route("/")
.get(inventoryController.allInventoriesList)
.post(inventoryController.postInventory);

module.exports = router;
