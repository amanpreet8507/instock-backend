const router = require("express").Router();
const warehouseController = require("../contorllers/warehouse-controller");

router.route("/").post(warehouseController.createWarehouse);

router.route("/:id").put(warehouseController.updateWarehouse);

module.exports = router;
