const router = require("express").Router();
const warehouseController = require("../controllers/warehouse-controller");

router.route("/")
    .get(warehouseController.warehouseList);

router.route("/:id")
    .get(warehouseController.warehouseListById)
    .put(warehouseController.updateWarehouse)
    .delete(warehouseController.deleteWarehouse);

router.route("/")
    .post(warehouseController.createWarehouse);

    
module.exports = router;
