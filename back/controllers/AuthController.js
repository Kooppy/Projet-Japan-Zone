const upload = require('../config/multer.js'),
      crypto = require('crypto');

exports.createUser = (req, res) => {
    let hash = crypto.createHash('sha256');
    hash.update(req.body.password);

    let sql = `INSERT INTO user SET email= ?, avatar= ?, pseudo= ?, mot_de_passe= ?`;
    let values = [
        req.body.email,
        req.file.filename,
        req.body.pseudo,
        hash.digest('hex')
    ];

    db.query(sql, values, function (err) {
        if (err) console.error('error :' + err.stack);
        res.redirect('back');
    });
}

exports.loginUser = (req, res) => {
    /*let sql = `SELECT * FROM user WHERE (pseudo = :pseudo OR email = :pseudo) AND confirmation_date IS NULL`;*/
    //let user = db.query(`SELECT * FROM user WHERE pseudo= ?`, req.body.pseudo, function (result){console.log(result);});
    let values = [
        req.body.pseudo,
        req.body.pseudo
    ];
    console.log("testestestes", req.session);
    /*console.log("test :", user);*/
    db.query(`SELECT * FROM user WHERE (pseudo= ? OR email= ?) AND confirmation_date IS NULL`, values, function (err, data) {
        if (err) console.error('error : ' + err.stack);

        let hash = crypto.createHash('sha256');
        hash.update(req.body.password);

        if (hash.digest('hex') === data[0].mot_de_passe) {
            console.log("cela fonctionne");
            req.session.user = {email: data[0].email, pseudo: data[0].pseudo};
            console.log("TEST :",req.session.user);
        } else {
            console.log("cela fonction pas du tout");
        }
        //console.log("Mon mot de passe crypt : ", data[0].mot_de_passe);

    })
    console.log(req.body);
    res.redirect('back');
}