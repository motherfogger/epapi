require('dotenv').config();

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


async function query(sql, values) {
  const queryConfig = {
    text: sql,
    values: values,
  };

  console.log("SQL QUERY:" + queryConfig.text); // log the final SQL statement

  try {
    await client.connect();
    const result = await client.query(queryConfig);
    console.log(result.rows); 
  } catch (error) {
    console.error("ERROR: Cant create admin. ", error.message);
    await client.end();
  } finally {
    await client.end();
  }
}

  if (process.env.NODE_ENV === 'development') {
    const { v4: uuidv4 } = require('uuid');
    let uuid = uuidv4();
    query('INSERT INTO users (id, firstname, lastname, email, password) VALUES ($1, $2, $3, $4, $5)', [uuid, 'John', 'Doe', 'admin@admin.com', 'xxx']);
  } else {
    console.log('INFO: admin cannot be created because you are running in production mode.');
  }

