/*
 * Controller: Auth (Auth)
 * ************************ */

const { hash } = require('../util/hash'), 
      { sendMail } = require('../util/nodemailer'),
      { selectID } = require('../util/select');

exports.createUser = async (req, res) => {
    const { email, pseudo, password } = req.body;
    
    try {
        
        const user_insert = await db.query(`INSERT INTO user SET email= :email, pseudo= :pseudo, password= :password, confirmation_date= NOW();`, {email, pseudo, password: hash(password)});
        const user_avatar = await db.query(`INSERT INTO pictureBank SET num_user= '${user_insert.insertId}';`)
        const user_insert_role = await db.query(`INSERT INTO user_role SET num_user= '${user_insert.insertId}';`);
        const user_insert_address = await db.query(`INSERT INTO user_address SET num_user= '${user_insert.insertId}';`);
        const user_insert_profil = await db.query(`INSERT INTO user_profil SET num_user= '${user_insert.insertId}';`);

        res.redirect('back');
    } catch (err) {
        throw err;
    }
   
}

exports.loginUser = async (req, res) => {
    const { pseudo } = req.body;
    
    try {
        const user_connect = await db.query(`SELECT user.num_user, user.email, user.pseudo, pictureBank.link_picture, user_role.isVerify, user_role.isAdmin
                                             FROM user 
                                               INNER JOIN pictureBank 
                                                 ON pictureBank.num_user = user.num_user 
                                               INNER JOIN user_role 
                                                 ON user_role.num_user = user.num_user 
                                             WHERE (pseudo= :pseudo OR email= :pseudo);`, {pseudo});

        const session_kill = await db.query(`DELETE FROM sessions WHERE data LIKE '%"id":${user_connect[0].num_user}%';`);

        req.session.user = { 
            id: user_connect[0].num_user, 
            email: user_connect[0].email, 
            avatar: user_connect[0].link_picture, 
            pseudo: user_connect[0].pseudo, 
            isVerify: user_connect[0].isVerify, 
            isAdmin: user_connect[0].isAdmin
        };
            
    } catch (err) {
        throw err;
    }
    res.redirect('back');
}

exports.forgot = async (req, res) => {
    const { email } = req.body;

    const token = Math.floor(Math.random() * 10000000);

    try {
        const user = await selectID('num_user', 'user', 'email= :value', email);

        req.session.forgot = {token: token, kiwi: user.num_user};
    
        let result = await sendMail({toEmail: email, subject: 'Mot de passe oublié', message: `Voici votre lien pour réinitialiser votre mot de passe : http://${req.get('host')}/resetPassword/${token}`, validate: 'Si votre email existe, un email sera envoyer.'});
    
        res.render('index', {flash: result.flash});
    } catch (err) {
        throw err;
    }
}

exports.logOut = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('sessionID');
        res.redirect('/');
    })
}
