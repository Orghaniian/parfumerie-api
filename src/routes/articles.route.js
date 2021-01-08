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

// get articles échangeables, limite par défaut à 10
router.get('/echangeables', function (req, res) {
    let limit = isNumeric(req.query.limit) ? req.query.limit : 10;
    let sql = `SELECT * FROM article WHERE Echangeable = 1 LIMIT ${limit}`;
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