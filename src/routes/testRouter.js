const express = require('express'),
router = express.Router();

// à supprimer
router.get("/", function(req, res) {
    res.json({
        status: 200,
        message: "test réussi"
    })  
})

module.exports = router;