const router = require("express").Router();
const warehouseController = require("../controllers/warehouse-controller");

router.route("/").get(warehouseController.warehouseList);
router.route("/warehouses").get(warehouseController.warehouseList);
router.route("/warehouses/:id").get(warehouseController.warehouseListById);

module.exports = router;
