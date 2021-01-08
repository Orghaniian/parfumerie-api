const HttpException = require('../utils/HttpException');
const isEmail = require('../utils/isEmail');

const express = require('express'),
    router = express.Router();

const clientArticlesRouter = require("./testRouter")

router.use("/test", clientArticlesRouter)

// get client
router.get('/:id', function (req, res) {
    let sql = `SELECT * FROM client WHERE Code_client = ${db.escape(req.params.id)}`;
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        if(data.length){
            res.json({
                status: 200,
                data,
                message: "Client récupéré avec succès"
            })  
        }else{
            res.json({
                status: 204,
                data,
                message: "Aucun client correspondant"
            })  
        }
    })
});

// créer nouveau client
router.post('/', function (req, res) {
    const keysToTest = ["nom"]
    if(!keysToTest.every(key => Object.keys(req.body).includes(key))){
        const missingKeys = keysToTest.filter(key => !Object.keys(req.body).includes(key))
        throw new HttpException(400, "Paramètre(s) manquant", {parametresManquants: missingKeys})
    }
    if(req.body.email && !isEmail(req.body.email)){
        throw new HttpException(400, "Email invalide", {emailInvalde: req.body.email})
    }
    let sql = `INSERT INTO client(nom, facebook, instagram, email, telephone) VALUES (?)`;
    let values = [
        req.body.nom,
        req.body.facebook,
        req.body.instagram,
        req.body.email,
        req.body.telephone
    ];
    db.query(sql, [values], function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            Code_client: data.insertId,
            message: "Nouveau client ajouté avec succès"
        })
    })
});

//update client
router.put('/:no', function (req, res) {
    if(req.body.email && !isEmail(req.body.email)){
        throw new HttpException(400, "Email invalide", {emailInvalde: req.body.email})
    }
    let sql = `UPDATE client SET ? WHERE Code_client = ${req.params.no}`;
    db.query(sql, req.body, function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            message: "Modification client réussie"
        })
    })
})


module.exports = router;