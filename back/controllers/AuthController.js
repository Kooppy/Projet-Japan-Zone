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
    let sql = `SELECT * FROM user WHERE (pseudo= ? OR email= ?) AND confirmation_date IS NULL`;
    
    let values = [
        req.body.pseudo,
        req.body.pseudo
    ];
    console.log("testestestes", req.session);

    db.query(sql, values, function (err, data) {
        if (err) console.error('error : ' + err.stack);

        let hash = crypto.createHash('sha256');
        hash.update(req.body.password);

        if (hash.digest('hex') === data[0].mot_de_passe) {
            let sess = req.session
            console.log("cela fonctionne");
            sess.views = {email: data[0].email, pseudo: data[0].pseudo};
            console.log("TEST :",sess.views);

        } else {
            console.log("cela fonction pas du tout");
        }
    })
    console.log(req.body);
    res.redirect('back');
}

exports.logOut = (req, res) => {
    req.session.destroy(() => {
        req.session = null;
        res.clearCookie('sessionID');
        console.log(req.session);
        res.redirect('back');
    })
}