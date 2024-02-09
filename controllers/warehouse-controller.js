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
    if (selectedwarehouseData.length > 0) {
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

const createWarehouse = async (req, res) => {
  try {
    // Destructuring values coming from req.body
    const {
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email,
    } = req.body;

    // Checking if every property exits in req.body to updat the whole object
    if (
      !warehouse_name ||
      !address ||
      !city ||
      !country ||
      !contact_name ||
      !contact_position ||
      !contact_phone ||
      !contact_email
    ) {
      return res.status(400).json({
        message: "Please provide all the required fields!",
      });
    }

    // check for the right format of the phone number e.g. +1 (123) 456-7890
    const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    if (!phoneRegex.test(contact_phone)) {
      return res.status(400).json({
        message: "Please provide a valid phone number!",
      });
    }

    // check for the right format of the email
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(contact_email)) {
      return res.status(400).json({
        message: "Please provide a valid email address!",
      });
    }

    // create new record in warehouse table
    const newWarehouseId = await knex("warehouses").insert({
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email,
    });

    // Fetch the newly created warehouse record
    const newWarehouse = await knex("warehouses")
      .where({ id: newWarehouseId[0] })
      .first();

    res.status(201).json(newWarehouse);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create a new warehouse: ${error}!`,
    });
  }
};

const updateWarehouse = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({
        message: "Please provide the warehouse ID!",
      });
    }

    // Destructuring values coming from req.body
    const {
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email,
    } = req.body;

    // Checking if every property exits in req.body to updat the whole object
    if (
      !warehouse_name ||
      !address ||
      !city ||
      !country ||
      !contact_name ||
      !contact_position ||
      !contact_phone ||
      !contact_email
    ) {
      return res.status(400).json({
        message: "Please provide all the required fields!",
      });
    }

    // check for the right format of the phone number e.g. +1 (123) 456-7890
    const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    if (!phoneRegex.test(contact_phone)) {
      return res.status(400).json({
        message: "Please provide a valid phone number!",
      });
    }

    // check for the right format of the email
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(contact_email)) {
      return res.status(400).json({
        message: "Please provide a valid email address!",
      });
    }

    // Update the warehouse record
    const updatedWarehouseId = await knex("warehouses")
      .where({ id: req.params.id })
      .update({
        warehouse_name,
        address,
        city,
        country,
        contact_name,
        contact_position,
        contact_phone,
        contact_email,
      });

    // Fetch the updated warehouse record
    const updatedWarehouse = await knex("warehouses")
      .where({ id: req.params.id })
      .first();

    res.status(200).json(updatedWarehouse);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update the warehouse with ID ${req.params.id}: ${error}!`,
    });
  }
};

module.exports = {
  createWarehouse,
  updateWarehouse,
  warehouseList, 
  warehouseListById 
};
