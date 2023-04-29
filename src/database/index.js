const { Client } = require('pg')

//connect to a database using DB_DATABASE in .env, use dotenv to read .env vars into Node
require('dotenv').config();

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})



module.exports = client;






