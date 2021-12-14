/*
 * Controller: Index (Home)
 * ************************ */

exports.index = (req, res) => {
    res.render('index');
}

/*
    let sql = `INSERT INTO user (email,avatar,pseudo,mot_de_passe) values(?)`;
    let values = [
        req.body.email,
        req.body.avatar,
        req.body.pseudo,
        req.body.password
    ];

    db.query(sql, [values], function (err) {
        if (err) console.error('error connect:' + err.stack);
    });

    db.query(sql, values, function (err) {
        if (err) console.error('error connect:' + err.stack);
    });

    db.query(sql, [req.body.email, req.body.avatar, req.body.pseudo, req.body.password], function (err) {
        if (err) console.error('error connect:' + err.stack);
    });
])*/

/*exports.updateUser = (req, res) => {
    console.log(req.body);
}

exports.deleteUser = (req, res) => {
    console.log(req.body);
}*/