/**
 * using the table blog with fields
 * id UUID PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        author_id UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    
    create a service to handle CRUD operations for blog posts
    - get all blog posts, with pagination, sorting, filtering, searching
    - get a single blog post by id
    - create a new blog post
    - update a blog post by id
    - delete a blog post by id

    using pg client from database.js
 * 
 */

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

    client.connect();
    // get all blog posts, set limit, offset, sort, order, filter_column, fields, search
module.exports.getBlogs = async (limit, offset, sort, order_by, filter_column, fields, search) => {
    // only put search if it is not empty 
    if (search != "") {
        let blogs = await client.query(
        `SELECT * FROM blog
        WHERE '$1' LIKE '%$2%'
        ORDER BY '$3', $4
        LIMIT $5
        OFFSET $6`, [filter_column, search, order_by, sort, limit, offset]);
        return blogs.rows;
    }
    else {
        let blogs = await client.query(
             `SELECT * FROM blog`);
        //  DEBUG: ERROR in parameterized query on columns entry
        // `SELECT * FROM blog
        // ORDER BY '$3' $4
        // LIMIT $5
        // OFFSET $6`, [filter_column, search, order_by, sort, limit, offset]); 
        console.log(typeof blogs.rows);
        console.log(blogs.rows);
        return blogs.rows;
    }
};
module.exports.getBlog = async (id) => {
    let blog = await client.query('SELECT * FROM blog WHERE id = $1 LIMIT 1', [id]);
    return blog.rows;
};

module.exports.createBlog = async (blog) => {
    const { v4: uuidv4 } = require('uuid');
    let blog_id = uuidv4();
    client.query('BEGIN');  //BEGIN a transaction
    let newBlog = await client.query('INSERT INTO blog (id, title, content, author_id) VALUES ($1, $2, $3, $4) RETURNING *', [blog_id, blog.title, blog.content, blog.author_id], (err, result) => {
        if (err) {
            //if there was an error postgres has already & automatically rolled back the transaction
            console.log("ERROR: Failed to create new blog post");
        }
        else {
            //COMMIT transaction if there was no error
            client.query('COMMIT');  
        }
    });
    return newBlog;
};

module.exports.updateBlog = async (id, blog) => {
    client.query('BEGIN');  //BEGIN a transaction
    let updatedBlog = await client.query('UPDATE blog SET title = $1, content = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *', [blog.title, blog.content, id], (err, result) => {
        if (err) {
            //if there was an error postgres has already & automatically rolled back the transaction
            console.log("ERROR: Failed to update blog post");
        }
        else {
            //COMMIT transaction if there was no error
            client.query('COMMIT');  
        }
    });
    return updatedBlog;
};

module.exports.deleteBlog = async (id) => {
    client.query('BEGIN');
    let deletedBlog = await client.query('DELETE FROM blog WHERE id = $1 RETURNING *', [id], (err, result) => {
        if (err) {
            console.log("ERROR: Failed to delete blog post");
        }
        else {
            client.query('COMMIT');
        }
    });
    return deletedBlog;
};

// close the client connection
// client.end();
// export the functions
// module.exports = {
//     getBlogs,
//     getBlog,
//     createBlog,
//     updateBlog,
//     deleteBlog
// };
// Example usage
// (async () => {
//     let blogs = await getBlogs(10, 0, 'asc', 'created_at', 'title', '*', '');
//     console.log(blogs);
// })();
// (async () => {
//     let blog = await getBlog('some-uuid');
//     console.log(blog);
// })();
// (async () => {
//     let newBlog = await createBlog({title: 'New Blog Post', content: 'This is a new blog post.', author_id: 'some-author-uuid'});
//     console.log(newBlog);
// })();
// (async () => {
//     let updatedBlog = await updateBlog('some-uuid', {title: 'Updated Blog Post', content: 'This is an updated blog post.'}); 
//     console.log(updatedBlog);
// })();
// (async () => {
//     let deletedBlog = await deleteBlog('some-uuid');
//     console.log(deletedBlog);
// })();
// Note: Uncomment the above example usages to test the functions
// Remember to replace 'some-uuid' and 'some-author-uuid' with actual UUIDs from your database
// Remember to handle errors and edge cases in a real application
// Remember to close the client connection when done
// client.end();
