const isNumeric = require('../utils/isNumeric');

const express = require('express'),
    router = express.Router();



// get articles, limite par défaut à 10
/* Paramètres
nom string
limit int 
stock BOOLEAN (si l'article est en stock)
disponible BOOLEAN
cadeau BOOLEAN
echangeable BOOLEAN
orderBy croi/dec
*/
router.get('/', function (req, res) {
    let limit = isNumeric(req.query.limit) ? req.query.limit : 10;
    let sql = `SELECT * FROM article WHERE nom LIKE '${req.query.nom ? req.query.nom.trim() : ""}%' `;
    if (req.query.echangeable) sql += " AND echangeable"
    if (req.query.cadeau) sql += " AND en_cadeau"
    if (req.query.disponible) sql += " AND disponible"
    if (req.query.echangeable) sql += " AND echangeable"
    if (req.query.stock) sql += " AND quantite_en_stock"
    if (req.query.orderBy) {
        if (req.query.orderBy === "asc") sql += " ORDER BY Prix_unitaire ASC"
        else if (req.query.orderBy === "dec") sql += " ORDER BY Prix_unitaire DESC"
        else if (req.query.orderBy === "nom") sql += " ORDER BY nom"
    }
    sql += ` LIMIT ${limit}`
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