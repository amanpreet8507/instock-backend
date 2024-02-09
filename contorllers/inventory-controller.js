const knex = require("knex")(require("../knexfile"));

// FOR ----> GET /api/warehouses/:id/inventories
const inventories = async (req, res) => {
  try {
    const inventoriesArrWithAllKeys = await knex("warehouses")
      .join("inventories", "inventories.warehouse_id", "warehouses.id")
      .where({ warehouse_id: req.params.id });

    const inventoriesArrWithItemKeys = inventoriesArrWithAllKeys.map(
      (item) => ({
        id: item.id,
        item_name: item.item_name,
        category: item.category,
        status: item.status,
        quantity: item.quantity,
      })
    );
    res.json(inventoriesArrWithItemKeys);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve inventories for warehouse with ID ${req.params.id}: ${error}`,
    });
  }
};

// For -----> PUT /api/inventories/:id ************************************************************
// FOR -----> API to PUT/EDIT an Inventory Item

const editInventory = async(req, res) => {
  try{
      // Destructuring values coming from req.body
      const {id , warehouse_id, item_name, description, category, status, quantity} = req.body;
      
      // Checking if every property exits in req.body to updat the whole object
      if(!warehouse_id || !item_name || !description || !category || !status || !quantity){
          return res.status(400).json({
              message: "Please provide the missing properties for the user in the request",
          });
      }

      // Sending the response or updating the whole object
      const editedInventoryItem = await knex('inventories').where({id: req.params.id})
      .update({id, warehouse_id, item_name, description, category, status, quantity})

      res.status(200).json(editedInventoryItem);
  } catch(error){
      res.status(400).json({
          message: `Unable to retrieve inventory with ID ${req.params.id}: ${error}!`,
        })
  }
}

module.exports = {
  allInventories,
  inventoriesById,
  editInventory
};
