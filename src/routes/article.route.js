const express = require('express'),
    router = express.Router();

// get article
router.get('/:no', function (req, res) {
    let sql = `SELECT * FROM article WHERE No_article = ${db.escape(req.params.no)}`;
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            data,
            message: "Article récupéré avec succès"
        })
    })
});

// créer nouvel article
router.post('/', function (req, res) {
    let sql = `INSERT INTO article(nom, prix_unitaire) VALUES (?)`;
    let values = [
        req.body.nom,
        req.body.prix_unitaire
    ];
    db.query(sql, [values], function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            no_article: data.insertId,
            message: "Nouvel article ajouté avec succès"
        })
    })
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

module.exports = router;