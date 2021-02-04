const HttpException = require('../utils/HttpException');

const express = require('express'),
    router = express.Router();

// get facture
router.get('/:no', function (req, res) {
    let sql = `SELECT * FROM facture WHERE No_facture = ${db.escape(req.params.no)}`;
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        console.log(req.params)
        if(data.length){
            res.json({
                status: 200,
                data: data[0],
                message: "Facture récupéré avec succès"
            })
        }else{
            res.json({
                status: 204,
                data,
                message: "Aucune facture correspondant"
            })  
        }
    })
});

// créer nouvelle facture
router.post('/', function (req, res) {
    console.log(req.body)
    const keysToTest = ["date_facture", "commande_no_commande"]
    if(!keysToTest.every(key => Object.keys(req.body).includes(key))){
        const missingKeys = keysToTest.filter(key => !Object.keys(req.body).includes(key))
        throw new HttpException(400, "Paramètre(s) manquant", {parametresManquants: missingKeys})
    }else{
        let sql = `INSERT INTO facture(Date_facture, Commande_No_commande) VALUES (?)`;
        let values = [
            req.body.date_facture,
            req.body.commande_no_commande
        ];
        db.query(sql, [values], function (err, data, fields) {
            if (err) throw err;
            res.json({
                status: 200,
                no_facture: data.insertId,
                message: "Nouvelle facture ajouté avec succès"
            })
        })
    }
});



//update facture
router.put('/:no', function (req, res) {
    let sql = `UPDATE facture SET ? WHERE No_facture = ${req.params.no}`;
    db.query(sql, req.body, function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            message: "Modification facture réussie"
        })
    })
})

//delete article
router.delete('/:no', function (req, res) {
    let sql = `DELETE FROM facture WHERE No_facture = ${db.escape(req.params.no)}`;
    db.query(sql, req.body, function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            message: "Suppression facture réussie"
        })
    })
})

module.exports = router;