const HttpException = require('../utils/HttpException');

const express = require('express'),
    router = express.Router();

// créer nouvel article
router.post('/', function (req, res) {
    const keysToTest = ["Identifiant", "Mot_De_Passe"]
    if(!keysToTest.every(key => Object.keys(req.body).includes(key))){
        const missingKeys = keysToTest.filter(key => !Object.keys(req.body).includes(key))
        throw new HttpException(400, "Paramètre(s) manquant", {parametresManquants: missingKeys})
    }else{
        let sql = `SELECT Identifiant, Mot_De_Passe, Admin, Code_Client FROM utilisateur WHERE Identifiant = '${req.body.Identifiant}' and Mot_De_Passe = '${req.body["Mot_De_Passe"]}'`;
        db.query(sql, function (err, data, fields) {
            if (err) throw err;
            if(data.length){
                res.json({
                    status: 200,
                    data: data[0],
                    message: "Utilisateur authentifié"
                })
            }else{
                res.statusCode = 401
                res.ok = false
                res.json({
                    status: 401,
                    data,
                    message: "Identifiants incorrects"
                })
            }
        })
    }
});

module.exports = router;