const express = require('express');

const router = express.Router();

router.get("/", (req, res) => {
    let items = [
        { id: 1, name: 'Item 1', price: 10 },
        { id: 2, name: 'Item 2', price: 20 },
        { id: 3, name: 'Item 3', price: 30 }
    ];
    res.json(items);
});


router.get("/:id", (req, res) => {
    // get items from table where id = req.params.id
    // if no item return "no item available"
    // return item

    let items = [{ id: 1, name: 'Item 1', price: 10 },
        { id: 2, name: 'Item 2', price: 20 },
        { id: 3, name: 'Item 3', price: 30 }];
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found');
    res.json(item);
});


module.exports = router;
