const crypto = require('crypto');
const connectDB = require('../config/connectDB');

exports.createUser = async (req, res) => {
    const {email, pseudo, password} = req.body;

    let hash = crypto.createHash('sha256');
    hash.update(password);

    /*db.promise().query(`INSERT INTO user SET email= '${ email }', avatar= 'avatar.jpg', pseudo= '${ pseudo }', password= '${ hash.digest('hex') }' `)
    .then( ([rows,fildes]) => {
        console.log(rows);
    })
    .catch(console.log)
    .then( () => db.end());*/

    try {
        const user_insert = await db.query(`INSERT INTO user SET email= '${email}', avatar= 'avatar.jpg', pseudo= '${pseudo}', password= '${ hash.digest('hex') }' `);
        console.log("test nonononon :", user_insert.insertId);
    } catch (err) {
        throw err;
    } /*finally {
        await db.end();
    }*/
    
    res.redirect('back');
}

exports.loginUser = async (req, res) => {
    const {pseudo, password} = req.body;
    console.log(pseudo);

    try {
        const user_connect = await db.query(`SELECT num_user, email, avatar, pseudo, password FROM user WHERE (pseudo= '${ pseudo }' OR email= '${ pseudo }') AND confirmation_date IS NULL;`);

        if(user_connect) {
            let hash = crypto.createHash('sha256');
            hash.update(password);

            console.log("test ouioui :",user_connect);

            if (hash.digest('hex') === user_connect[0].password) {

                req.session.user = {id: user_connect[0].num_user, email: user_connect[0].email, avatar: user_connect[0].avatar, pseudo: user_connect[0].pseudo};
                //res.render('index', { success: "HEYHEYHEY " + data[0].pseudo })
                res.redirect('back');
                console.log("TEST :",req.session.user);
    
            } else {
                console.log("cela fonction pas du tout");
            }
        }
    } catch (err) {
        throw err;
    } finally {
        await db.end();
    }

    /*let sql = `SELECT * FROM user WHERE (pseudo= ? OR email= ?) AND confirmation_date IS NULL`;
    
    let values = [
        req.body.pseudo,
        req.body.pseudo
    ];

    console.log("testestestes", req.session);

    db.query(sql, values, function (err, data) {
        if (err) console.error('error : ' + err.stack);

        let hash = crypto.createHash('sha256');
        hash.update(req.body.password);

        if (hash.digest('hex') === data[0].password) {
            
            req.session.user = {id: data[0].num_user, email: data[0].email, avatar: data[0].avatar, pseudo: data[0].pseudo};
            //res.render('index', { success: "HEYHEYHEY " + data[0].pseudo })
            res.redirect('back');
            console.log("TEST :",req.session.user);

        } else {
            console.log("cela fonction pas du tout");
        }
        
    })*/
    
}

exports.logOut = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('sessionID');
        console.log("Clear Cookie session log :", req.session);
        res.redirect('back');
    })
}
