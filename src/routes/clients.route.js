const isNumeric = require('../utils/isNumeric');

const express = require('express'),
    router = express.Router();

// get clients, limite par défaut à 10
router.get('/', function (req, res) {
    let limit = isNumeric(req.query.limit) ? req.query.limit : 10;
    let sql = `SELECT * FROM client WHERE nom LIKE '${req.query.nom ? req.query.nom.trim() : ""}%' `;
    if (req.query.orderBy) {
        if (req.query.orderBy === "asc") sql += " ORDER BY Code_client ASC"
        else if (req.query.orderBy === "dec") sql += " ORDER BY Code_client DESC"
        else if (req.query.orderBy === "nom") sql += " ORDER BY Nom"
    }
    sql += ` LIMIT ${limit}`
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            data,
            message: "Liste de clients récupérée avec succès"
        })
    })
});


module.exports = router;