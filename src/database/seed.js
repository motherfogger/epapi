require('dotenv').config();
//connect to a database using DB_DATABASE in .env, use dotenv to read .env vars into Node
// require node-postgres create seed for users table
const { Client, Pool } = require('pg');
console.log('DB_DATABASE: ' + process.env.DB_DATABASE);
console.log('DB_PASSWORD: ' + process.env.DB_PASSWORD);
console.log('DB_USER: ' + process.env.DB_USER);

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

//  create a promised that will create users table if not existing
const createUsersTablePromise = new Promise((resolve, reject) => {
  // create users table with uuid as primary key
  client.query(
    `CREATE TABLE users ( 
        sid SERIAL,
        id UUID PRIMARY KEY,
        firstname VARCHAR(255) NOT NULL,
        lastname VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`,
    (err, res) => {
      if (err) {
        console.log('ERROR: create table error');
      } else {
        console.log('users table created successfully');
      }
    }
  );
  client.query(
    `CREATE UNLOGGED TABLE blog (
        sid SERIAL,
        id UUID PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`,
    (err, res) => {
      if (err) {
        console.log('ERROR: create table error');
      } else {
        console.log('users table created successfully');
      }
    }
  );

  // Create an enumerated type for the status column
  client.query(
    `CREATE TYPE status_enum AS ENUM('active', 'inactive', 'suspended')`,
    (err, res) => {
      if (err) {
        console.log('ERROR: create status_enum error');
      } else {
        console.log('status_enum created successfully');
      }
    }
  );

  // Add a status column with the enumerated type to the users table
  client.query(
    `ALTER TABLE users ADD COLUMN status status_enum DEFAULT 'active' NOT NULL`,
    (err, res) => {
      if (err) {
        console.log('ERROR: create status column error');
      } else {
        console.log('status column created successfully');
      }
    }
  );

  // if non-production
    if (process.env.NODE_ENV === 'development') {
        // uuid
        const { v4: uuidv4 } = require('uuid');
        let uuid = uuidv4();
        client.query(
          `INSERT INTO 
              users (UUID, firstname, lastname, email, password) VALUES 
              ('${uuid}', 'John', 'Doe', 'admin@admin.com', 'xxx'),`,
          (err, res) => {
            if (err) {
              console.log('ERROR: insert data error');
              client.end();
            } else {
              console.log('insert data successfully');
              client.end();
            }
          }
        );
    }
});

client.connect();
// check users table if existing, create if not existing
client.query('SELECT * FROM users', (err, res) => {
  if (err) {
    console.log('ERROR: users table does not exist');
    // close connection
    client.end();
    // create users table if not existing
    createUsersTablePromise.then(() => {
      // close connection
      client.end();
    });
  } else {
    // log that the users table exists
    console.log('INFO: users table exists');
    // close connection
    client.end();
  }
});
