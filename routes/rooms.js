const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => {
    res.status(200).json({message: "Get all rooms"});
});
router.put('/:id', async (req, res) => {
    res.status(200).json({message: "Get all rooms"});
});
router.get('/:id', async (req, res) => {
    res.status(200).json({message: "Get all rooms"});
});

module.exports = router;