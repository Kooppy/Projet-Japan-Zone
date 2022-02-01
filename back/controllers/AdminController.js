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

exports.editUser = async (req, res) => {

}

exports.banUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user_ban = await db.query(`UPDATE user_role SET isBan = true WHERE num_user = '${id}';`);
        const session_kill = await db.query(`DELETE FROM sessions WHERE data LIKE '%"id":${id}%'`);
        res.redirect('back');
    }catch (err) {
        throw err;
    }
}

exports.archivingUser = async (req, res) => {

}


exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try{
        const user_toppings = await db.query(`DELETE user_role, user_profil, user_address FROM user INNER JOIN user_role ON user_role.num_user = user.num_user INNER JOIN user_profil ON user_profil.num_user = user.num_user INNER JOIN user_address ON user_address.num_user = user.num_user WHERE user.num_user = '${id}'`);
        const user = await db.query(`DELETE FROM user WHERE user.num_user = '${id}'`);
    } catch (err) {
        throw err;
    }
}

exports.addBlog = async (req, res) => {
    const { title, description, content } = req.body;

    console.log("image :", req.file.filename);

    console.log("original name :", req.file.originalname);

    /*try {
        const blog = await db.query(`INSERT INTO blog SET title= '${title}', description= '${description}', contents= ${content}, article_date= NOW(), num_user= '${req.session.user.id}' `);

        const name = title.split(' ').join('_');


        const picture = await db.query(`INSERT INTO pictureBank SET link_picture= '${title}', num_user= '${req.session.user.id}', num_blog= '${blog.insertID}' `);
    } catch (err) {
        throw err;
    }*/

}

exports.editBlog = async (req, res) => {

}

exports.deleteBlog = async (req, res) => {

}

exports.addGallery = async (req, res) => {

}

exports.editGallery = async (req, res) => {

}

exports.deleteGallery = async (req, res) => {

}

exports.addDiary = async (req, res) => {

}

exports.editDiary = async (req, res) => {

}

exports.deleteDiary = async (req, res) => {

}
