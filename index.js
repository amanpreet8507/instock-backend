// imports
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());

const PORT = 24955 || 5050;

// Use routes
const inventoryRoutes = require("./routes/inventory-route");
const warehouseRoutes = require("./routes/warehouse-route");

app.use("/warehouses", warehouseRoutes);
//app.use("/warehouses", inventoryRoutes);
app.use("/inventories", inventoryRoutes);
app.use("/warehouses", inventoryRoutes)

// App listen
app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});

// Localhost home
app.get("/", (_req, res) => {
  const apiEndpoints = {
    warehouseList : "http://localhost:8080/warehouses   GET, POST",
    warehouseByID: "http://localhost:8080/warehouses/:id    GET, PUT, DELETE",
    inventoriesList: "http://localhost:8080/inventories   GET,POST",
    inventoryById: "http://localhost:8080/inventories/:id   GET, PUT, DELETE",
    getInventoriesOfParticularWarehouse:"http://localhost:8080/warehouses/:id/inventories   GET",
  }
  res.json(apiEndpoints);
});
