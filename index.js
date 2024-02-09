// imports
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5050;

// Use routes
const inventoryRoutes = require("./routes/inventory-route");
const warehouseRoutes = require("./routes/warehouse-route");

app.use("/warehouses", warehouseRoutes);
app.use("/inventories", inventoryRoutes);

// App listen
app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});

// Localhost home
app.get("/", (req, res) => {
  res.json("Hi! You are approaching to get to Stocks API!!");
});
