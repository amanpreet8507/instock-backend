const router = require("express").Router();
const warehouseController = require("../contorllers/warehouse-controller");
router
  .route('/')
  .get(warehouseController.warehouseList);
  module.exports = router;