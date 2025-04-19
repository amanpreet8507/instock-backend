const knex = require("../knexfile");

// FOR -----> GET /api/warehouses/:id/inventories ******************************************
// FOR -----> API to GET Inventories for a Given Warehouse

const allInventories = async (req, res) => {
  try {
    // Fetch the whole inventories array with all properties
    const inventoriesArrWithAllProp = await knex("warehouses")
      .join("inventories", "inventories.warehouse_id", "warehouses.id")
      .where({ warehouse_id: req.params.id });

    // Filter out properties that are required and return that new array
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
// FOR -----> API to GET/FIND a Single Inventory Item

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

    const fetchWarehousedetails = await knex("warehouses")
      .where({
        id: inventoryObject.warehouse_id,
      })
      .first();

    if (fetchWarehousedetails) {
      inventoryObject.warehouse_name = fetchWarehousedetails.warehouse_name;
    } else {
      inventoryObject.warehouse_name = "Not found!";
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
// FOR -----> API to PUT/UPDATE OR EDIT an Inventory Item

const editInventory = async (req, res) => {
  // Destructuring values coming from req.body
  const {
    id,
    warehouse_id,
    item_name,
    description,
    category,
    status,
    quantity,
  } = req.body;

  // Checking if every property exits in req.body to updat the whole object
  if (
    !warehouse_id ||
    !item_name ||
    !description ||
    !category ||
    !status ||
    !quantity
  ) {
    return res.status(400).json({
      message:
        "Please provide the missing properties for the user in the request",
    });
  }

  try {
    // Sending the response or updating the whole object
    const editedInventoryItem = await knex("inventories")
      .where({ id: req.params.id })
      .update({
        id,
        warehouse_id,
        item_name,
        description,
        category,
        status,
        quantity,
      });

    res.status(200).json(editedInventoryItem);
  } catch (error) {
    res.status(400).json({
      message: `Unable to retrieve inventory with ID ${req.params.id}: ${error}!`,
    });
  }
};

// For -----> POST /api/inventories/:id ************************************************************
// FOR -----> API to POST/INSERT or ADD an Inventory Item

const postInventory = async (req, res) => {
  console.log(req.body);
  try {
    // Destructuring values coming from req.body
    const { warehouse_id, item_name, description, category, status, quantity } =
      req.body;
    // Ensure warehouse_id and quantity are integers
    const warehouseId = parseInt(warehouse_id);
    const quantityInt = parseInt(quantity);

    // Checking if all properties exist and are valid
    if (
      isNaN(warehouseId) ||
      !item_name ||
      !description ||
      !category ||
      !status ||
      isNaN(quantityInt)
    ) {
      return res.status(400).json({
        message: "Please provide all required fields with valid values",
      });
    }

    // Inserting the new inventory into the knex
    const newInventory = await knex("inventories")
      .insert({
        warehouse_id: warehouseId, // Use the parsed warehouse ID
        item_name,
        description,
        category,
        status,
        quantity: quantityInt, // Use the parsed quantity
      })
      .returning("id"); // Ensure it returns the inserted ID

    const newInventoryId = newInventory[0]?.id || newInventory[0]; // Handle environments like SQLite vs PostgreSQL

    // Retrieving the created inventory from the database
    const createdInventory = await knex("inventories")
      .where({ id: newInventoryId })
      .first();

    res.status(200).json(createdInventory);
  } catch (error) {
    res.status(400).json({
      message: `Unable to post inventory: ${error}`,
    });
  }
};

// For -----> DELETE /api/inventories/:id ************************************************************
// FOR -----> API to DELETE/REMOVE an Inventory Item

const deleteInventory = async (req, res) => {
  try {
    // Get the inventory with id from params and delete it
    const inventoryDelete = await knex("inventories")
      .where({ id: req.params.id })
      .delete();

    if (inventoryDelete === 0) {
      return res
        .status(404)
        .json({ message: `Inventory with ID ${req.params.id} not found` });
    }

    // No Content response
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({
      message: `Unable to delete inventory with id ${req.params.id}: ${error}`,
    });
  }
};

// For -----> GET /api/inventories ************************************************************
// FOR -----> GET the list of all inventories

const allInventoriesList = async (req, res) => {
  try {
    const inventoriesArray = await knex("inventories");
    if (inventoriesArray.length > 0) {
      res.status(200).json(inventoriesArray);
    } else {
      res.status(400).json(`There are no inventories available: ${error}`);
    }
  } catch (error) {
    res.status(400).json(`Error in retrieving the inventory list: ${error}`);
  }
};

module.exports = {
  allInventories,
  inventoriesById,
  editInventory,
  postInventory,
  deleteInventory,
  allInventoriesList,
};
