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

module.exports = {
  inventories,
};
