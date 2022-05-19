/*
 * Config: Validator
 * ************************ */

const { check } = require('express-validator'), 
      { selectID } = require('../../util/select'), 
      { hash } = require('../../util/hash');

module.exports = {

    //Auth Validator
    configRegister: () => {
        return [check('pseudo')
            .isLength({
                min: 4
            })
            .withMessage('Votre pseudo doit faire 4 caractère minimum'),
            check('pseudo')
            .isLength({
                max: 128
            })
            .withMessage('Votre pseudo est trop volumineux.'),
            check('pseudo').custom(async (value) => {
                const userPseudo = await selectID('count(*) as num', 'user', 'pseudo= :value', value);
               
                if (userPseudo.num === 1) {
                    throw new Error('Le pseudo est déjà prit !');
                }
                return true;
            }),
            check('email')
            .isEmail()
            .withMessage('Email invalide'),
            check('email')
            .isLength({
                max: 32
            })
            .withMessage('Votre email à trop de caractère limiter qui est limiter à 32.'),
            check('email').custom(async (value) => {
                const userEmail = await selectID('count(*) as num', 'user', 'email= :value', value);

                if (userEmail.num === 1) {
                    throw new Error('Un compte existe déjà avec cet email !');
                }
                return true;
            }),
            check('password')
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\%\@])[0-9a-zA-Z\%\@]{8,}$/)
            .withMessage(' Votre mot de passe doit contenir 8 caractère minimums et possèder au moins 1 caractère minuscule, 1 caractère majuscule, 1 chiffre et 1 caractère spéciale (% ou @) '),
            // .matches(/^(?=.*\d)[0-9a-zA-Z\%\@]{1,}$/)
            // .withMessage(' 1 Chiffre.'),
            // check('password')
            // .matches(/^(?=.*[a-z])[0-9a-zA-Z\%\@]{1,}$/)
            // .withMessage(' 1 caractère minuscule.'),
            // check('password')
            // .matches(/^(?=.*[\%\@])[0-9a-zA-Z\%\@]{1,}$/)
            // .withMessage(' 1 caractère spéciale.'),
            // check('password')
            // .matches(/^(?=.*[A-Z])[0-9a-zA-Z\%\@]{1,}$/)
            // .withMessage(' 1 Majuscule.'),
            // check('password')
            // .isLength({
            //     min: 8
            // })
            // .withMessage('Doit faire 8 caractère minimum.'),
            check('password').custom((value, { req }) => {
                if (value !== req.body.cPassword) {
                    throw new Error('La confirmation de mot de passe est incorrecte !');
                }
                return true;
            })
        ];
    },
    configLogin: () => {
        return [check('pseudo').custom( async(value, {
            req
        }) => {
            const user = await selectID('num_user, password', 'user', 'pseudo= :value OR email= :value', value);
            if (!user || user.password !== hash(req.body.password)) {
                throw new Error('Erreur de connexion login ou mot de passe faux !');
            } else {
                const isBan = await selectID('isBan', 'user_role', 'num_user= :value', user.num_user);
                const isArchiving = await selectID('isArchiving', 'user_role', 'num_user= :value', user.num_user);

                if (isBan.isBan) {
                    throw new Error('Votre compte est bannie !');
                } else if (isArchiving.isArchiving) {
                    throw new Error('Votre compte est archiver, veuillez contact un admin pour vous déarchiver.');
                }
            }
            return true;
        })];
    },
    configForgot: () => {
        return [check('email').custom(async(value) => {
                const user = await selectID('count(*) as num', 'user', 'email= :value', value)
                if (user.num === 0) {
                    throw new Error('Si votre email existe, un email sera envoyer.');
                }
                return true;
            })];
    },
    configResetPassword: () => {
        return [check('password')
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\%\@])[0-9a-zA-Z\%\@]{8,}$/)
            .withMessage(' Votre mot de passe doit contenir 8 caractère minimums et possèder au moins 1 caractère minuscule, 1 caractère majuscule, 1 chiffre et 1 caractère spéciale (% ou @) '),
            check('password').custom((value, { req }) => {
                if (value !== req.body.cPassword) {
                    throw new Error('La confirmation de mot de passe est incorrecte !');
                }
                return true;
            })
        ]
    },
    configComment: () => {
        return [
            check('message').isLength({min: 10, max: 200})
            .withMessage('Votre message doit comporter au minimun 10 caractère et doit comporter 200 caractère max.')
        ]
    },
    configEditUser: () => {
        return [check('pseudo')
            .isLength({
                min: 4
            })
            .withMessage('Votre pseudo doit faire 4 caractère mini.'),
            check('pseudo')
            .isLength({
                max: 128
            })
            .withMessage('Votre pseudo est trop volumineux.'),
            check('pseudo').custom(async (value, {req}) => {
                console.log('PSEUDO PSEUDO',req.body.pseudo);
                const userPseudo = await selectID('count(*) as num', 'user', 'pseudo= :value', value);
               
                if (userPseudo.num === 1) {
                    throw new Error('Le pseudo est déjà prit !');
                }
                return true;
            }),
            check('email')
            .isEmail()
            .withMessage('Email invalide'),
            check('email')
            .isLength({
                max: 32
            })
            .withMessage('Votre email à trop de caractère limiter qui est limiter à 32.'),
            check('email').custom(async (value) => {
                const userEmail = await selectID('count(*) as num', 'user', 'email= :value', value);

                if (userEmail.num === 1) {
                    throw new Error('Un compte existe déjà avec cet email !');
                }
                return true;
            }),
            check('name')
            .isLength({
                max: 32
            })
            .withMessage('Votre nom à trop de caractère limiter qui est limiter à 32.'),
            check('first_name')
            .isLength({
                max: 32
            })
            .withMessage('Votre prénom à trop de caractère limiter qui est limiter à 32.'),
            check('address')
            .isLength({
                max: 32
            })
            .withMessage('Votre addresse à trop de caractère limiter qui est limiter à 32.'),
            check('postal_code')
            .isLength({
                max: 5
            })
            .withMessage('Votre code postal à trop de caractère limiter qui est limiter à 5.'),
            check('city')
            .isLength({
                max: 15
            })
            .withMessage('Votre nom de ville à trop de caractère limiter qui est limiter à 15.'),
            check('phone')
            .isLength({
                max: 10
            })
            .withMessage('Votre téléphonne à trop de caractère limiter qui est limiter à 10.'),
            check('civility')
            .isLength({
                max: 1
            })
            .withMessage('Votre civilité à trop de caractère limiter qui est limiter à 1.'),
            check('description')
            .isLength({
                max: 128
            })
            .withMessage('Votre description à trop de caractère limiter qui est limiter à 128.'),
        ]
    },

    configEditNewPasswordProfil: () => {
        return [check('oldPassword').custom( async(value, { req }) => {

                const user = await selectID('password', 'user', 'pseudo= :value', req.params.id);
                
                if (user.password !== hash(value)) {
                    throw new Error('Votre ancien mot de passe est incorrecte !');
                }
                return true;
            }),
            check('password')
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\%\@])[0-9a-zA-Z\%\@]{8,}$/)
            .withMessage(' Votre mot de passe doit contenir 8 caractère minimums et possèder au moins 1 caractère minuscule, 1 caractère majuscule, 1 chiffre et 1 caractère spéciale (% ou @) '),
            check('password').custom((value, { req }) => {
                if (value !== req.body.cPassword) {
                    throw new Error('La confirmation de mot de passe est incorrecte !');
                }
                return true;
            })
        ]
    },

    //Contact Validator
    configSendMessage: () => {
        return [check('name')
            .not()
            .isEmpty()
            .withMessage('Le nom ne peut être vide'),
            check('name')
            .isLength({
                max: 32
            })
            .withMessage('Le nom trop volumineux'),
            check('email')
            .isEmail()
            .withMessage('Email invalide'),
            check('email')
            .isLength({
                max: 32
            })
            .withMessage('Le email trop volumineux'),
            check('subject')
            .isLength({
                min: 5
            })
            .withMessage('Votre objet doit faire 5 caractère minimum.'),
            check('subject')
            .isLength({
                max: 32
            })
            .withMessage('Le objet trop volumineux'),
            check('message')
            .isLength({
                min: 10
            })
            .withMessage('Votre message doit faire 10 caractère minimum.'),
            check('message')
            .isLength({
                max: 500
            })
            .withMessage('Le message trop volumineux'),
        ];
    },

    //Panel Admin Validator - Tab Blog
    configBlog: () => {
        return [check('title')
            .not()
            .isEmpty()
            .withMessage('Veuillez, mettre un titre.'),
            check('title')
            .isLength({ 
                max: 32
            })
            .withMessage('Le titre ne doit pas dépasser les 32 caractères. '),
            check('picBlog')
            .not()
            .isEmpty()
            .withMessage('Veuillez, rajouter une image.'),
            check('picBlog').custom((value, { req }) => {
                console.log('piclobg balue', value);

                console.log('piclobg baezffzelue', req.body.picBlog);
                return true;
            }),
            check('description')
            .not()
            .isEmpty()
            .withMessage('Veuillez, mettre une description.'),
            check('description')
            .isLength({ 
                max: 128
            })
            .withMessage('Le titre ne doit pas dépasser les 128 caractères. '),
            check('category')
            .not()
            .isEmpty()
            .withMessage('Veuillez, mettre une category.'),
            check('category')
            .isLength({ 
                max: 128
            })
            .withMessage('Le titre ne doit pas dépasser les 128 caractères. '),
            check('content')
            .isLength({
                min: 100
            })
            .withMessage('Votre message doit faire 100 caractère minimum.')
        ];
    },

    //Panel Admin Validator - Tab Gallery
    configGallery: () => {
        return [check('title')
            .isLength({ 
                max: 32
            })
            .withMessage('Le titre ne doit pas dépasser les 32 caractères. '),
            check('picBlog')
            .not()
            .isEmpty()
            .withMessage('Veuillez, rajouter une image.'),
            check('description')
            .isLength({ 
                max: 128
            })
            .withMessage('Le titre ne doit pas dépasser les 128 caractères. '),
            check('category')
            .not()
            .isEmpty()
            .withMessage('Veuillez, mettre une category.'),
            check('category')
            .isLength({ 
                max: 128
            })
            .withMessage('Le titre ne doit pas dépasser les 128 caractères. '),
        ];
    },
}