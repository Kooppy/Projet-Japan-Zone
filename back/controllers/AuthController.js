/*
 * Controller: Auth (Auth)
 * ************************ */

const { sendMail } = require('../util/nodemailer'),
      AuthModel = require('../model/AuthModel');

class AuthController {

    async login(req, res) {
        const { pseudo, password } = req.body;
        try {
            const user = new AuthModel({ pseudo, password });
            user.postLogin().then((data) => {
                req.session.user = { 
                    id: data.num_user, 
                    email: data.email, 
                    avatar: data.link_picture, 
                    pseudo: data.pseudo, 
                    isVerify: data.isVerify, 
                    isAdmin: data.isAdmin
                };
                return res.redirect('back');

            }).catch((err) => { throw err; } );
            
        } catch (err) {
            throw err;
        }
    }

    async register(req, res) {
        const { email, pseudo, password } = req.body;
        try {
            const register = new AuthModel({ email, pseudo, password });
            register.postRegister().then(async(data) => {

                const token = Math.floor(Math.random() * 10000000);

                req.session.verify = { token: token, mangue: data };
            
                let result = await sendMail(
                    { 
                        toEmail: email, 
                        subject: 'Valider votre compte', 
                        message: `Voici votre lien pour valider votre compte : http://${req.get('host')}/verify/${token}`, 
                        validate: 'Compte enregistrer, penser à regarder votre email pour le valider.'
                    });
                
                req.session.msg = result.flash;

                return res.redirect('/')
            })
            
        } catch (err) {
            throw err;
        }
    }

    async forgot(req, res) {
        const { email } = req.body;
        try {
            const userForgot = new AuthModel({ email });
            userForgot.postForgot().then(async(data) => {

                const token = Math.floor(Math.random() * 10000000);

                req.session.forgot = { token: token, kiwi: data.num_user };
            
                let result = await sendMail(
                    { 
                        toEmail: email, 
                        subject: 'Mot de passe oublié', 
                        message: `Voici votre lien pour réinitialiser votre mot de passe : http://${req.get('host')}/resetPassword/${token}`, 
                        validate: 'Si votre email existe, un email sera envoyer.'
                    });

                req.session.msg = result.flash;

                return res.redirect('/')
            })

            
        } catch (err) {
            throw err;
        }
    }

    async logOut(req, res) {
        req.session.destroy(() => {
            res.clearCookie('sessionID');
            res.redirect('/');
        })
    }


}

module.exports = AuthController;
