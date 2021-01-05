const isNumeric = require('../utils/isNumeric');

const express = require('express'),
    router = express.Router();

// get articles, limite par défaut à 10
router.get('/', function (req, res) {
    let limit = isNumeric(req.query.limit) ? req.query.limit : 10;
    let sql = `SELECT * FROM article LIMIT ${limit}`;
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            data,
            message: "Liste d'articles récupérée avec succès"
        })
    })
});


module.exports = router;