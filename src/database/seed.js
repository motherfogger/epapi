require('dotenv').config();
//connect to a database using DB_DATABASE in .env, use dotenv to read .env vars into Node
// require node-postgres create seed for users table
const { Client, Pool } = require('pg')
console.log(process.env.DB_DATABASE)
console.log(process.env.DB_PASSWORD)
console.log(process.env.DB_USER)

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})




//  create a promised that will create users table if not existing
const createUsersTablePromise = new Promise((resolve, reject) => {

    // creat extension for uuid_generate_v4()
    client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`, (err, res) => {
        if (err) {
            console.log("create extension error", err.stack)
        } else {
            console.log("extension created successfully")
        }
    });

    // create users table with uuid as primary key
    client.query(`CREATE TABLE users ( 
        sid SERIAL,
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        firstname VARCHAR(255) NOT NULL,
        lastname VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`, (err, res) => {
        if (err) {
            console.log("create table error", err.stack)
        } else {
            console.log("users table created successfully")
        }
    })



    //     --Create an enumerated type for the status column
    // CREATE TYPE status_enum AS ENUM('active', 'inactive', 'suspended');
    client.query(`CREATE TYPE status_enum AS ENUM('active', 'inactive', 'suspended')`, (err, res) => {
        if (err) {
            console.log("create status_enum error", err.stack)
        } else {
            console.log("status_enum created successfully")
        }
    })

    //     --Add a status column with the enumerated type to the users table
    // ALTER TABLE users ADD COLUMN status status_enum DEFAULT 'active' NOT NULL;
    client.query(`ALTER TABLE users ADD COLUMN status status_enum DEFAULT 'active' NOT NULL`, (err, res) => {
        if (err) {
            console.log("create status column error", err.stack)
        } else {
            console.log("status column created successfully")
        }
    })



    // insert seed data into users table
    client.query(
        `INSERT INTO 
        users (firstname, lastname, email) VALUES 
        ('John', 'Doe', 'johndoe@gmail.com'), 
        ('Jane', 'Doe', 'johndoe@gmail.com'),
        ('Bob', 'Smith', 'bobsmith@gmail.com')`, (err, res) => {
        if (err) {
            console.log("insert data error", err.stack)
        } else {
            console.log("insert data successfully")
        }
    }
    );
});


client.connect()
// check users table if existing, create if not existing
client.query('SELECT * FROM users', (err, res) => {
    if (err) {
        console.log(err.stack);
        // close connection
        client.end();
        // create users table if not existing
        createUsersTablePromise.then(() => {
            // close connection
            client.end();
        });

    } else {
        // log that the users table exists
        console.log("INFO: users table exists")
        // close connection
        client.end();
    }
})




