const knex = require("knex")(require("../knexfile"));

const warehouseList = async (_req, res) => {
    try {
      const data = await knex('warehouses');
      res.status(200).json(data);
    } catch(err) {
      res.status(400).send(`Error retrieving the warehouse list: ${err}`)
    }
  }
  module.exports = {warehouseList}