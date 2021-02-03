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
        const sql = `INSERT INTO commande (Prix, Frais_livraison, Code_client ${req.body.date_commande ? ",Date_commande" : ""} ${req.body.statut ? ", statut" : ""} ) VALUES (?)`;
        const values = [
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
                const sql = `UPDATE article SET Quantite_en_stock = Quantite_en_stock - ${article.quantite} WHERE No_article = ${article.no}`;
                db.query(sql, function (err3, data3, fields3){
                    if (err3) throw err3;
                    const sql = `INSERT INTO commande_has_article (no_commande, no_article, quantite, prix_achat) VALUES (${data.insertId}, ${article.no}, ${article.quantite}, ${article.prixUnit})`
                    db.query(sql, function (err2, data2, fields2) {
                        if (err2) throw err2;
                    })
                })
            })

            const sql = `UPDATE client SET Points = Points - ${req.body.prix} WHERE Code_client = ${req.body.code_client}`
            db.query(sql, function (err4, data4, fields4){
                if (err4) throw err4;
                res.json({
                    status: 200,
                    No_commande: data.insertId,
                    message: "Nouvelle commande ajouté avec succès"
                })
            })

        })
    }
});

// modifier une commande
router.put('/:no', function (req, res) {
    let sql = `UPDATE commande SET ? WHERE No_commande = ${req.params.no}`;
    db.query(sql, req.body, function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            message: "Modification commande réussi"
        })
    })
});

module.exports = router;