const express = require('express');

const router = express.Router();

// Pages
router.get('/', (req,res) => {
    res.send("Berhasil")
});


// Api


module.exports = router;
