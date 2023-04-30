
const client = require('../database');

module.exports.getUsers = async (limit = 100, offset = 0, sort = "ASC", order_by = "lastname", filter_column = "lastname",  search="") => {
    // get users, set limit, offset, sort, order, filter_column, fields, search
    // only put search if it is not empty
    if (search != "") {
        let users = await client.query(
        `SELECT * FROM users
        WHERE '$1' LIKE '%$2%' 
        ORDER BY '$3', $4
        LIMIT $5
        OFFSET $6`, [filter_column, search, order_by, sort, limit, offset]);
        return users.rows;
    }
    else {
        let users = await client.query(
             `SELECT * FROM users`);
        //  DEBUG: ERROR in parameterized query on columns entry
        // `SELECT * FROM users
        // ORDER BY '$3' $4
        // LIMIT $5
        // OFFSET $6`, [filter_column, search, order_by, sort, limit, offset]);

        console.log(typeof users.rows);
        console.log(users.rows);
        return users.rows;
    }
};


module.exports.getUser = async (id) => {
    let user = await client.query('SELECT * FROM users WHERE id = $1 LIMIT 1', [id]);

    return user.rows;

};

module.exports.createUser = async (user) => {
    const { v4: uuidv4 } = require('uuid');
    let user_id = uuidv4();
    client.query('BEGIN');  //BEGIN a transaction
    let newUser = await client.query('INSERT INTO users (id, name, email) VALUES ($1, $2, $3, $4) RETURNING *', [user_id, user.name, user.email, password], (err, result) => {
        if (err) {
            //if there was an error postgres has already & automatically rolled back the transaction
            console.log("ERROR: Failed to create new user");
        }
        else {
            //COMMIT transaction if there was no error
            client.query('COMMIT');  
        }
    });

    return newUser;

};

module.exports.updateUser = async (id, user) => {
    
    client.query('BEGIN');  //BEGIN a transaction
    let updatedUser = await client.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [user.name, user.email, id], (err, result) => {
        if (err) {
            //if there was an error postgres has already & automatically rolled back the transaction
            console.log("ERROR: Failed to update user");
        }
        else {
            client.query('COMMIT');  //COMMIT transaction if there was no error
        }
    });
    
    return updatedUser;

};

module.exports.deleteUser = async (id) => {
    let deletedUser = await client.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);

    return deletedUser;

};
