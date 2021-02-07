const HttpException = require('../utils/HttpException');

const express = require('express'),
    router = express.Router();

// get article
router.get('/:no', function (req, res) {
    let sql = `SELECT * FROM article WHERE No_article = ${db.escape(req.params.no)}`;
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        if(data.length){
            res.json({
                status: 200,
                data: data[0],
                message: "Article récupéré avec succès"
            })
        }else{
            res.json({
                status: 204,
                data,
                message: "Aucun article correspondant"
            })  
        }
    })
});

// créer nouvel article
router.post('/', function (req, res) {
    const keysToTest = ["nom"]
    if(!keysToTest.every(key => Object.keys(req.body).includes(key))){
        const missingKeys = keysToTest.filter(key => !Object.keys(req.body).includes(key))
        throw new HttpException(400, "Paramètre(s) manquant", {parametresManquants: missingKeys})
    }else{
        let sql = `INSERT INTO article(nom, prix_unitaire, quantite_en_stock, disponible, en_cadeau, echangeable${req.body.image ? ", image" : ""}) VALUES (?)`;
        let values = [
            req.body.nom,
            req.body.prix_unitaire,
            req.body.quantite_en_stock,
            req.body.disponible,
            req.body.en_cadeau,
            req.body.echangeable
        ];
        if (req.body.image) values.push(req.body.image)
        db.query(sql, [values], function (err, data, fields) {
            if (err) throw err;
            res.json({
                status: 200,
                no_article: data.insertId,
                message: "Nouvel article ajouté avec succès"
            })
        })
    }
});



//update article
router.put('/:no', function (req, res) {
    let sql = `UPDATE article SET ? WHERE No_article = ${req.params.no}`;
    db.query(sql, req.body, function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            message: "Modification article réussie"
        })
    })
})

//delete article
router.delete('/:no', function (req, res) {
    let sql = `SELECT count(*) FROM commande_has_article WHERE No_article = ${db.escape(req.params.no)}`;
    db.query(sql, req.body, function (err, data, fields) {
        if (err) throw err;
       /* res.json({
            status: 200,
            message: "L'article a déjà été commandé"
        })*/

        console.log(data[0])

        //si l'article a déjà été commandé on ne le supprime pas pour garder une trace, on le rend seulement indisponible 
        if (data[0] !== 0){
            sql = `UPDATE article SET Disponible=0 WHERE No_article = ${db.escape(req.params.no)}`;
            db.query(sql, req.body, function (err, data, fields) {
                if (err) throw err;
                res.json({
                    status: 200,
                    message: "Modification article réussie",
                    supressed: false
                })
            })

        }else{
            sql = `DELETE FROM article WHERE No_article = ${db.escape(req.params.no)}`;
            db.query(sql, req.body, function (err, data, fields) {
                if (err) throw err;
                res.json({
                    status: 200,
                    message: "Suppression article réussie",
                    supressed: true
                })
            })
        }
    })
})

module.exports = router;