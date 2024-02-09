const router = require("express").Router();
const warehouseController = require("../contorllers/warehouse-controller");

router.route("/").post(warehouseController.createWarehouse);

module.exports = router;
