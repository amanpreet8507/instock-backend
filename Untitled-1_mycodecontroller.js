const knex = require("knex")(require("../knexfile"));

const warehouseList = async (req, res) => {
  try {
    const allWarehouseData = await knex("warehouses");
    res.status(200).json(allWarehouseData);
  } catch (err) {
    res.status(400).send(`Error in retrieving the warehouse list: ${err}`);
  }
};
const warehouseListById = async (req, res) => {
  const selectedwarehouseData = await knex("warehouses").where({
    id: req.params.id,
  });
  try {
    if (selectedwarehouseData) {
      res.status(200).json(selectedwarehouseData);
    } else {
      res
        .status(404)
        .json("Error in retrieving the selected warehouse information.");
    }
  } catch (err) {
    res
      .status(400)
      .json(`Error in retrieving the selected warehouse information: ${err}`);
  }
};
module.exports = { warehouseList, warehouseListById };
