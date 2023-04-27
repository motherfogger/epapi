const express = require('express');

const router = express.Router();


router.get("/:id", (req, res) => {
    let orders = [
        { id: 1, userId: 1, itemIds: [1, 2], quantity: 2 },
        { id: 2, userId: 2, itemIds: [2, 3], quantity: 3 },
        { id: 3, userId: 3, itemIds: [1], quantity: 1 }
    ];
  res.json(orders);
});


module.exports = router;
