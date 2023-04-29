const express = require('express');
const router = express.Router();

const userService = require('../services').users;



router.get("/find", async (req, res) => {
  // set up a query limit to 100 
  let limit = req.query.limit || 100;
  // set up a query offset to 0
  let offset = req.query.offset || 0;
  // set up a query sort to id
  let sort = req.query.sort || 'id';
  // set up a query order to asc
  let order = req.query.order || 'asc';
  // set up a query filter to empty string
  let filter = req.query.filter || '';
  // set up a query fields to empty string
  let fields = req.query.fields || '';
  // set up a query fields to empty string
  let search = req.query.search || '';
  // set up a query fields to empty string



  let users = await userService.getUsers(limit, offset, sort, order, filter, fields, search);
  res.json(users);

  
});

router.get("/:id", (req, res) => {
  let users = [
    { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
    { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' },
    { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com' }
  ];
  res.json(users);
});


module.exports = router;
