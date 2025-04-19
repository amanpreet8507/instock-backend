require('dotenv').config();
const knex = require('knex');

const connection = knex({
  client: 'mysql2',
  connection: {
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT
  }
});

module.exports = connection;
