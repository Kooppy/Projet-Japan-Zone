/*
 * Controller: User (User)
 * ************************ */

const { selectID } = require("../../util/select");

exports.profilID = async (req, res) => {
    const { id } = req.params;
    
    try {
        const profilUser = await db.query(`SELECT user.num_user, user.email, user.pseudo, user.password, user.confirmation_date, pictureBank.link_picture, user_address.name, user_address.first_name, user_address.address, user_address.postal_code, user_address.city, user_address.phone, user_profil.civility, user_profil.description
                                      FROM user
                                      INNER JOIN user_role ON user_role.num_user = user.num_user
                                      INNER JOIN user_address ON user_address.num_user = user.num_user
                                      INNER JOIN user_profil ON user_profil.num_user = user.num_user
                                      WHERE num_user = ${id}; `);

        res.render('profil', {profilUser})
    } catch (err) {
        throw err;
    }
}

exports.editProfil = async (req, res) => {
    let {
        pseudo,
        email,
        name,
        first_name,
        address,
        postal_code,
        city,
        phone,
        civility,
        description,
        password
    } = req.body;

    try {
        const selectUser = await db.query(`SELECT user.num_user, user.email, user.pseudo, user.password, pictureBank.link_picture, user_address.name, user_address.first_name, user_address.address, user_address.postal_code, user_address.city, user_address.phone, user_profil.civility, user_profil.description
                                           FROM user
                                           INNER JOIN pictureBank ON pictureBank.link_picture LIKE '%user%' AND pictureBank.num_user = user.num_user
                                           INNER JOIN user_address ON user_address.num_user = user.num_user
                                           INNER JOIN user_profil ON user_profil.num_user = user.num_user
                                           WHERE user.num_user = ${req.params.id};`)

        pseudo = !pseudo ? selectUser[0].pseudo : pseudo;
        email = !email ? selectUser[0].email : email;
        name = !name ? selectUser[0].name : name;
        first_name = !first_name ? selectUser[0].first_name : first_name;
        address = !address ? selectUser[0].address : address;
        postal_code = !postal_code ? selectUser[0].postal_code : postal_code;
        city = !city ? selectUser[0].city : city;
        phone = !phone ? selectUser[0].phone : phone;
        civility = !civility ? selectUser[0].civility : civility;
        description = !description ? selectUser[0].description : description;
        password = !password ? selectUser[0].password : password;

        // const user = await db.query(`UPDATE user SET isBan = true WHERE num_user = '${req.params.id}';`);
        res.redirect('back');
    } catch (err) {
        throw err;
    }
}

exports.comment = async (req, res) => {
    const { message } = req.body,
          { id } = req.params;

    try {
        const blogId = await selectID('num_blog', 'blog', 'title= :value', id);
        const comment = await db.query(`INSERT INTO comment SET contents= :message, date= NOW(), num_user= '${req.session.user.id}', num_blog= '${blogId.num_blog}';`, {message})
        res.redirect('back');
    } catch (err) {
        throw err;
    }
}

exports.deleteComment = async (req, res) => {
    const { id } = req.params;

    try {
        const delComment = await db.query(`DELETE FROM comment WHERE num_comment=${id};`);
        res.redirect('back');
    } catch (err) {
        throw err;
    }
}

