/*
 * Controller: Admin (Admin)
 * ************************ */

const fakeDB = require('../database/fakedb.json');

exports.admin = async (req, res) => {
    try {
        const users = await db.query(`SELECT user.num_user, user.email, user.avatar, user.pseudo, user.password, user.confirmation_date, user_role.isVerify, user_role.isAdmin, user_role.isBan, user_address.name, user_address.first_name, user_address.address, user_address.postal_code, user_address.city, user_address.phone, user_profil.civility, user_profil.profil_info
                                      FROM user
                                      INNER JOIN user_role ON user_role.num_user = user.num_user
                                      INNER JOIN user_address ON user_address.num_user = user.num_user
                                      INNER JOIN user_profil ON user_profil.num_user = user.num_user;`);
        res.render('admin', {
            user: users,
            blog: fakeDB.blogs,
            message: fakeDB.messages,
            galerie: fakeDB.galeries
        });
    } catch (err) {
        throw err;
    }
}

exports.banUser = async (req, res) => {
    
}

exports.deleteUser = async (req, res) => {
    const { id } = req.params

    try{
        const user_toppings = await db.query(`DELETE user_role, user_profil, user_address FROM user INNER JOIN user_role ON user_role.num_user = user.num_user INNER JOIN user_profil ON user_profil.num_user = user.num_user INNER JOIN user_address ON user_address.num_user = user.num_user WHERE user.num_user = '${id}'`);
        const user = await db.query(`DELETE FROM user WHERE user.num_user = '${id}'`);
    } catch (err) {
        throw err;
    }
}