/*
 * Controller: Reset Password (Reset Password)
 * ************************ */
const {
    hash
} = require('../util/hash');

exports.resetPassword = (req, res) => {
    res.render('resetPassword', {namePage: 'Reset Password', });
}

exports.reset = async (req, res) => {
    const {
        password
    } = req.body;
    try {

        const updatePassword = await db.query(`UPDATE user SET password= :password WHERE num_user= ${req.session.forgot.kiwi};`, {
            password: hash(password)
        })

        //const session_kill = await db.query(`DELETE FROM sessions WHERE data LIKE '%"token":${req.session.forgot.token}%';`);

        req.session.msg = 'Votre mot de passe est bien modifier.';

        res.redirect('/');
    } catch (err) {
        throw err;
    }

}