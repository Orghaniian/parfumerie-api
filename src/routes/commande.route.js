const HttpException = require('../utils/HttpException');

const express = require('express'),
    router = express.Router();

// get commande
router.get('/:id', function (req, res) {
    let sql = `SELECT * FROM commande WHERE No_commande = ${db.escape(req.params.id)}`;
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        if (data.length) {
            res.json({
                status: 200,
                data,
                message: "Commande récupéré avec succès"
            })
        } else {
            res.json({
                status: 204,
                data,
                message: "Aucune commande correspondant"
            })
        }
    })
});

// créer nouvelle commande
router.post('/', function (req, res) {
    if (!req.body.articles || req.body.articles.length === 0) throw new HttpException(400, "La commande doit contenir des articles", { articles: req.body.articles })

    const keysToTest = ["prix", "frais_livraison", "code_client"]
    if (!keysToTest.every(key => Object.keys(req.body).includes(key))) {
        const missingKeys = keysToTest.filter(key => !Object.keys(req.body).includes(key))
        throw new HttpException(400, "Paramètre(s) manquant", { parametresManquants: missingKeys })
    } else {
        let sql = `INSERT INTO commande (Prix, Frais_livraison, Code_client ${req.body.date_commande ? ",Date_commande" : ""} ${req.body.statut ? ", statut" : ""} ) VALUES (?)`;
        let values = [
            req.body.prix,
            req.body.frais_livraison,
            req.body.code_client
        ];
        if (req.body.date_commande) values.push(req.body.date_commande)
        if (req.body.statut) values.push(req.body.statut)
        db.query(sql, [values], function (err, data, fields) {
            console.log("articles: ", req.body.articles)
            if (err) throw err;
            req.body.articles.forEach(article => {
                const sql = `INSERT INTO commande_has_article (no_commande, no_article, quantite, prix_achat) VALUES (${data.insertId}, ${article.no_article}, ${article.quantite}, ${article.prix_achat})`
                db.query(sql, function (err2, data2, fields2) {
                    if (err2) throw err2;
                })
            })
            res.json({
                status: 200,
                No_commande: data.insertId,
                message: "Nouvelle commande ajouté avec succès"
            })
        })
    }
});

// modifier une commande
router.post('/:no', function (req, res) {
    let sql = `UPDATE commande SET ? WHERE No_commande = ${req.params.no}`;
    db.query(sql, [values], function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            message: "Modification commande réussi"
        })
    })
});

module.exports = router;