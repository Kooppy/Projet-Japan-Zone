const crypto = require('crypto');

exports.createUser = async (req, res) => {
    const {email, pseudo, password} = req.body;

    let hash = crypto.createHash('sha256');
    hash.update(password);

    try {
        const user_insert = await db.query(`INSERT INTO user SET email= '${email}', avatar= 'avatar.jpg', pseudo= '${pseudo}', password= '${ hash.digest('hex') }' `);
        const user_insert_role = await db.query(`INSERT INTO user_role SET num_user= '${user_insert.insertId}' `);
        const user_insert_address = await db.query(`INSERT INTO user_address SET num_user= '${user_insert.insertId}' `);
        const user_insert_profil = await db.query(`INSERT INTO user_profil SET num_user= '${user_insert.insertId}' `);
        //const user_insert_toppings = await db.query(`INSERT INTO user_role SET num_user= '${user_insert.insertId}'; INSERT INTO user_address SET num_user= '${user_insert.insertId}'; INSERT INTO user_profil SET num_user= '${user_insert.insertId}'; `);
    } catch (err) {
        throw err;
    } /*finally {
        await db.end();
    }*/
    res.redirect('back');
}

exports.loginUser = async (req, res) => {
    const {pseudo, password} = req.body;

    try {
        const user_connect = await db.query(`SELECT user.num_user, user.email, user.avatar, user.pseudo, user.password, user_role.isVerify, user_role.isAdmin, user_role.isBan FROM user INNER JOIN user_role ON user_role.num_user = user.num_user WHERE (pseudo= '${ pseudo }' OR email= '${ pseudo }') AND confirmation_date IS NULL;`);

        let hash = crypto.createHash('sha256')
        hash.update(password);

        if(user_connect && hash.digest('hex') === user_connect[0].password) {
            req.session.user = {id: user_connect[0].num_user, email: user_connect[0].email, avatar: user_connect[0].avatar, pseudo: user_connect[0].pseudo, isVerify: user_connect[0].isVerify, isBan: user_connect[0].isBan, isAdmin: user_connect[0].isAdmin};
            //res.render('index', { success: "HEYHEYHEY " + data[0].pseudo })
            res.redirect('back');
            console.log("TEST :",req.session.user);
    
        } else {
            console.log("cela fonction pas du tout");
            res.render('index', { error: "votre pseudo / email ou votre mot de passe est faux " })
        }
    } catch (err) {
        throw err;
    } /*finally {
        await db.end();
    }*/
}

exports.logOut = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('sessionID');
        console.log("Clear Cookie session log :", req.session);
        res.redirect('back');
    })
}
