
const client = require('../database');



module.exports.getUsers = async (limit = 100, offset = 0, sort = "ASC", order_by = "lastname", filter = "lastname",  search="") => {
    // get users, set limit, offset, sort, order, filter, fields, search

    client.connect();
    // only put search if it is not empty
    if (search != "") {
        let users = await client.query(
        `SELECT * FROM users
        WHERE '$1' LIKE '%$2%' 
        ORDER BY '$3', $4
        LIMIT $5
        OFFSET $6`, [filter, search, order_by, sort, limit, offset]);
        return users.rows;
    }
    else {
        let users = await client.query(
             `SELECT * FROM users`);
        //  DEBUG: ERROR in parameterized query on columns entry
        // `SELECT * FROM users
        // ORDER BY '$3' $4
        // LIMIT $5
        // OFFSET $6`, [filter, search, order_by, sort, limit, offset]);

        console.log(typeof users.rows);
        console.log(users.rows);
        return users.rows;
    }
};


module.exports.getUser = async (id) => {
    let user = await client.query('SELECT * FROM users WHERE id = $1', [id]);

    return user;

};

module.exports.createUser = async (user) => {
    let newUser = await client.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [user.name, user.email]);

    return newUser;

};

module.exports.updateUser = async (id, user) => {
    let updatedUser = await client.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [user.name, user.email, id]);

    return updatedUser;

};

module.exports.deleteUser = async (id) => {
    let deletedUser = await client.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);

    return deletedUser;

};
