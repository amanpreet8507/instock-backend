const knex = require("knex")(require("../knexfile"));

// FOR -----> GET /api/warehouses/:id/inventories ******************************************
// FOR -----> API to GET Inventories for a Given Warehouse

const allInventories = async (req, res) => {
  try {
    // Fetch the whole inventories array with all properties
    const inventoriesArrWithAllProp = await knex("warehouses")
      .join("inventories", "inventories.warehouse_id", "warehouses.id")
      .where({ warehouse_id: req.params.id });

    // Filter our properties that are required and return that new array
    const inventoriesArrWithItemProp = inventoriesArrWithAllProp.map(
      (item) => ({
        id: item.id,
        item_name: item.item_name,
        category: item.category,
        status: item.status,
        quantity: item.quantity,
      })
    );
    res.status(200).json(inventoriesArrWithItemProp);
  } catch (error) {
    res.status(404).json({
      message: `Unable to retrieve inventories for warehouse with ID ${req.params.id}: ${error}!`,
    });
  }
};


// For -----> GET /api/inventories/:id ************************************************************
// FOR -----> API to GET a Single Inventory Item

const inventoriesById = async (req, res) => {
  try {
    const inventoryFound = await knex("inventories").where({
      id: req.params.id,
    });

    // If there is no inventory found
    if (inventoryFound.length === 0) {
      return res.status(400).json({
        message: `Inventory with ID${req.params.id} not found!`,
      });
    }

    // Return the first object found
    const inventoryObject = inventoryFound[0];

    const fetchWarehousedetails = await knex("warehouses").where({
        id: inventoryObject.warehouse_id,
    }).first();

    if(fetchWarehousedetails){
        inventoryObject.warehouse_name = fetchWarehousedetails.warehouse_name;
    } else{
        inventoryObject.warehouse_name = 'Not found!';
    }
    
    // Remove created_at and updated_at properties and return that new Object
    const { warehouse_id, created_at, updated_at, ...filteredInventoryObject } =
      inventoryObject;
    res.status(200).json(filteredInventoryObject);
  } catch (error) {
    res.status(404).json({
      message: `Unable to retrieve inventory with ID ${req.params.id}: ${error}!`,
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
