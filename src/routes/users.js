const express = require('express');
const router = express.Router();
var sanitize = require('../tools/sanitize');

const userService = require('../services').users;

router.get("/find", async (req, res) => {

  let limit = sanitize.number(req.query.limit) || 100;
  let offset = sanitize.number(req.query.offset) || 0;
  let sort = sanitize.string(req.query.sort) || 'id';
  let order = sanitize.string(req.query.order) || 'asc';
  let filter = sanitize.string(req.query.filter) || '';
  let search = sanitize.string(req.query.search) || '';

  let users = await userService.getUsers(limit, offset, sort, order, filter, search);
  res.json(users);

  
});

router.get("/:id", async (req, res) => {

  let id = sanitize.uuid(req.params.id);
  let users = await userService.getUser(id);
  res.json(users);
});


module.exports = router;
