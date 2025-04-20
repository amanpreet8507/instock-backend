require('dotenv').config();
const knex = require('knex');

module.exports = {
  production: {
    client: 'mysql2',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  }
};