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
            
            req.session.user = {id: data[0].num_user, email: data[0].email, avatar: data[0].avatar, pseudo: data[0].pseudo};
            //res.render('index', { success: "HEYHEYHEY " + data[0].pseudo })
            res.redirect('back');
            console.log("TEST :",req.session.user);

        } else {
            console.log("cela fonction pas du tout");
        }
        
    })
    
}

exports.logOut = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('sessionID');
        console.log("Clear Cookie session log :", req.session);
        res.redirect('back');
    })
}