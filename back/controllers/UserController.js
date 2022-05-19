/*
 * Controller: User (User)
 * ************************ */

const { selectID } = require("../util/select"),
      { sendMail } = require('../util/nodemailer'),
      { hash } =require('../util/hash');

exports.profilID = async (req, res) => {
    const { id } = req.params;

    const flash = req.session.reg_error;
    const backURL = req.session.backURL;
    const message = req.session.msg;

    req.session.backURL = '';
    req.session.reg_error = '';
    req.session.msg= '';
    
    try {
        const profilUser = await db.query(`SELECT user.num_user, user.email, user.pseudo, user.confirmation_date, pictureBank.link_picture, user_address.name, user_address.first_name, user_address.address, user_address.postal_code, user_address.city, user_address.phone, user_profil.civility, user_profil.description
                                      FROM user
                                      INNER JOIN pictureBank ON pictureBank.num_user = user.num_user
                                      INNER JOIN user_role ON user_role.num_user = user.num_user
                                      INNER JOIN user_address ON user_address.num_user = user.num_user
                                      INNER JOIN user_profil ON user_profil.num_user = user.num_user
                                      WHERE user.pseudo= :id; `, {id});

                                      console.log(profilUser[0]);

        switch (backURL) {
            case `/profil/${id}?_method=PUT`:
                res.render('profil', {profilUser: profilUser[0], modalEditProfil: flash})
                break;

            case `/profil/newPassword/${id}?_method=PUT`:
                res.render('profil', {profilUser: profilUser[0], modalNewPassword: flash})
                break;
        
            default:
                res.render('profil', {profilUser: profilUser[0], message})
                break;
        }
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

    const { id } = req.params

    try {
        const selectUser = await db.query(`SELECT user.num_user, user.email, user.pseudo, user.password, pictureBank.link_picture, user_role.isAdmin, user_role.isVerify, user_address.name, user_address.first_name, user_address.address, user_address.postal_code, user_address.city, user_address.phone, user_profil.civility, user_profil.description
                                           FROM user
                                           INNER JOIN pictureBank ON pictureBank.link_picture LIKE '%user%' AND pictureBank.num_user = user.num_user
                                           INNER JOIN user_role ON user_role.num_user = user.num_user
                                           INNER JOIN user_address ON user_address.num_user = user.num_user
                                           INNER JOIN user_profil ON user_profil.num_user = user.num_user
                                           WHERE user.pseudo = :id;`, {id})

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
        avatar = !req.file.path ? selectUser[0].link_picture : req.file.path;

        const user_update = await db.query(`UPDATE user SET pseudo= :pseudo, email= :email WHERE num_user = :id ;`, {id: selectUser[0].num_user, pseudo, email});
        const user_avatar_update = await db.query(`UPDATE pictureBank SET link_picture= :avatar  WHERE num_user = :id ;`, {id: selectUser[0].num_user, avatar});
        const user_address_update = await db.query(`UPDATE user_address SET name= :name, first_name= :first_name, address= :address, postal_code= :postal_code, city= :city, phone= :phone  WHERE num_user = :id ;`, {id: selectUser[0].num_user, name, first_name, address, postal_code, city, phone});
        const user_profil_update = await db.query(`UPDATE user_profil SET civility= :civility, description= :description  WHERE num_user = :id ;`, {id: selectUser[0].num_user, civility, description});

        req.session.user = { 
            id: selectUser[0].num_user, 
            email: email, 
            avatar: avatar, 
            pseudo: pseudo, 
            isVerify: selectUser[0].isVerify, 
            isAdmin: selectUser[0].isAdmin
        }

        if (pseudo !== id) {
            res.redirect(`/profil/${pseudo}`);
        }else {
            res.redirect('back');
        }
        
    } catch (err) {
        throw err;
    }
}

exports.newPasswordProfil = async (req, res) => {
    const { password } = req.body,
          { id } = req.params;
    try {

        const updatePassword = await db.query(`UPDATE user SET password= :password WHERE pseudo= :id;`, {
            id, password: hash(password)
        })

        req.session.msg = 'Votre mot de passe est bien modifier.';

        res.redirect('back');
    } catch (err) {
        throw err;
    }

}

exports.archivingProfil = async (req, res) => {
    const {
        id
    } = req.params;

    try {

        const user_archiving = await db.query(`UPDATE user_role SET isArchiving = true WHERE num_user = :id;`, {id});

        req.session.msg = 'Votre compte est bien archiver.';
            
        res.redirect('/');

    } catch (err) {
        throw err;
    }
}

exports.requestVerifyUpdate = async (req, res) => {

    try {

        const token = Math.floor(Math.random() * 10000000);

        req.session.verify = { token: token, mangue: req.session.user.id };
    
        let result = await sendMail(
            { 
                toEmail: req.session.user.email, 
                subject: 'Valider votre compte', 
                message: `Voici votre lien pour valider votre compte : http://${req.get('host')}/verify/${token}`, 
                validate: 'Un nouvelle est email à était envoyer à fin de vérifier votre compte.'
            });

        req.session.msg = result.flash;

        return res.redirect('/')
    } catch (err) {
        throw err;
    }
}


exports.comment = async (req, res) => {
    const { message } = req.body,
          { title } = req.params;

    try {
        const blogId = await selectID('num_blog', 'blog', 'title= :value', title);
        const comment = await db.query(`INSERT INTO comment SET contents= :message, date= NOW(), num_user= :sessId, num_blog= '${blogId.num_blog}';`, {message, sessId: req.session.user.id})
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

