const router = require("express").Router();
const warehouseController = require("../controllers/warehouse-controller");

router.route("/")
    .get(warehouseController.warehouseList)
    .post(warehouseController.createWarehouse)

router.route("/:id")
    .get(warehouseController.warehouseListById)
    .put(warehouseController.updateWarehouse)
    .delete(warehouseController.deleteWarehouse);
  
module.exports = router;
