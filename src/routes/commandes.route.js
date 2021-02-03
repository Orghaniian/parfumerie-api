const isNumeric = require('../utils/isNumeric');

const express = require('express'),
    router = express.Router();

// get list de commandes par date de création , limite par défaut à 10
router.get('/', function (req, res) {
    let limit = isNumeric(req.query.limit) ? req.query.limit : 10;
    let sql = `SELECT * FROM commande ORDER BY Date_commande LIMIT ${limit}`;
    if (req.query.orderBy) {
        if (req.query.orderBy === "asc") sql += " ORDER BY Date_commande ASC"
        else if (req.query.orderBy === "dec") sql += " ORDER BY Date_commande DESC"
        else if (req.query.orderBy === "num") sql += " ORDER BY No_commande"
    }

    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            data,
            message: "Liste de commandes récupéré avec succès"
        })  
    })
});

// get list de commandes du client par date de création , limite par défaut à 10
router.get('/client/:id', function (req, res) {
    let limit = isNumeric(req.query.limit) ? req.query.limit : 10;
    let sql = `SELECT * FROM commande WHERE Client_Code_client =  ${db.escape(req.params.id)} ORDER BY Date_commande LIMIT ${limit}`;
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            data,
            message: "Liste de commandes de  récupéré avec succès"
        })  
    })
});

module.exports = router;