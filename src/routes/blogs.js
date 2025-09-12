const express = require('express');

const router = express.Router();


router.get("/blogs", (req, res) => {
    res.send("Get all blog posts");
});

router.post("/blogs", (req, res) => {
    res.send("Create a new blog post");
});   
router.get("/blogs/:id", (req, res) => {
    res.send(`Get blog post with id ${req.params.id}`);
});

router.put("/blogs/:id", (req, res) => {
    res.send(`Update blog post with id ${req.params.id}`);
}); 
router.delete("/blogs/:id", (req, res) => {
    res.send(`Delete blog post with id ${req.params.id}`);
});

module.exports = router;