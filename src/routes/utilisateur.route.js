const HttpException = require('../utils/HttpException');

const express = require('express'),
    router = express.Router();

//inscription
router.post("/", function (req, res){
    console.log(req.body)
    const keysToTest = ["identifiant", "mot_de_passe", "code_client"]
    if (!keysToTest.every(key => Object.keys(req.body).includes(key))) {
        const missingKeys = keysToTest.filter(key => !Object.keys(req.body).includes(key))
        throw new HttpException(400, "Paramètre(s) manquant", { parametresManquants: missingKeys })
    } else {
        let sql = `INSERT INTO utilisateur (Identifiant, Mot_De_Passe, Code_Client) VALUES (?)`
        const values = [
            req.body.identifiant,
            req.body.mot_de_passe,
            req.body.code_client
        ]
        try{
            db.query(sql, [values], function(err, data, fields) {
                if(err) throw err;
                res.json({
                    status: 200,
                    No_commande: data.insertId,
                    message: "Nouvelle utilisateur inscrit avec succès"
                })
            })
        }catch (e) {
            res.json({
                status: 400,
                message: e.message
            })
        }
    }
})


module.exports = router;