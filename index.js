const express = require('express');
const app = express();
const cors = require('cors')
require("dotenv").config();

app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});

app.get('/', (req, res)=>{
    res.json('Hi! You are approaching to get to Stocks API!!')
})