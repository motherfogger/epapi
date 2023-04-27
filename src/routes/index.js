const express = require('express');

const router = express.Router();


router.get("/", (req, res) => {
  console.log("id: ")
  console.log(req.params.id)
  console.log(req.query.age)
  // console.log(req)
  let json = { message: 'Hello world',
               status: 'ok' 
  };
  res.json(json);
});


module.exports = router;
