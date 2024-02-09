const router = require("express").Router();
const warehouseController = require("../controllers/warehouse-controller");
const warehouseController = require("../contorllers/warehouse-controller");

router.route("/").get(warehouseController.warehouseList);
router.route("/warehouses").get(warehouseController.warehouseList);
router.route("/warehouses/:id").get(warehouseController.warehouseListById);
router.route("/").post(warehouseController.createWarehouse);
router.route("/:id").put(warehouseController.updateWarehouse);

module.exports = router;
