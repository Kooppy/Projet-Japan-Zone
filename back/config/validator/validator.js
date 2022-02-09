const { check } = require('express-validator'), 
      { validate } = require('../../middleware/validate'), 
      { selectID } = require('../../util/select'),
      { hash } = require('../../util/hash');

exports.methodValidate = (method) => {
    switch (method) {
        case 'register':
            return validate(
                [check('pseudo')
                    .isLength({
                        min: 8
                    })
                    .withMessage('Votre pseudo doit faire 8 caractère mini.'),
                    check('pseudo').custom((async value => {
                        const userPseudo = await selectID('pseudo', 'user', value);

                        if (userPseudo) {
                            throw new Error('Le pseudo est déjà prit !');
                        }
                        return true;
                    })),
                    check('email')
                    .isEmail()
                    .withMessage('Email invalide'),
                    check('email').custom((async value => {
                        const userEmail = await selectID('email', 'user', value);

                        if (userEmail) {
                            throw new Error('Un compte existe déjà avec cet email !');
                        }
                        return true;
                    })),
                    check('password')
                    .matches(/^(?=.*\d)[0-9a-zA-Z\%\@]{1,}$/)
                    .withMessage(' 1 Chiffre.')
                    .matches(/^(?=.*[a-z])[0-9a-zA-Z\%\@]{1,}$/)
                    .withMessage(' 1 caractère minuscule.')
                    .matches(/^(?=.*[\%\@])[0-9a-zA-Z\%\@]{1,}$/)
                    .withMessage(' 1 caractère spéciale.')
                    .matches(/^(?=.*[A-Z])[0-9a-zA-Z\%\@]{1,}$/)
                    .withMessage(' 1 Majuscule.'),
                    check('password').custom((value, {
                        req
                    }) => {
                        if (value !== req.body.cPassword) {
                            throw new Error('La confirmation de mot de passe est incorrecte !');
                        }
                        return true;
                    })
                ]);
        case 'login':
            return validate(
                [check('pseudo').custom((async value => {
                    const user = await db.query(`SELECT password FROM user WHERE (pseudo= '${ value }' OR email= '${ value }');`);

                    if (!user[0] || hash(value) !== user[0].password) {
                        throw new Error('Erreur de connexion login ou mot de passe faux !');
                    }
                    return true;
                })),
                check('password').custom((async value => {
                    let test = hash(value)
                    const userP = await db.query(`SELECT password FROM user WHERE  email= '${ test }';`);
                    
                    if (!userP[0]) {
                        throw new Error('Erreur de connexion login ou mot de passe faux !');
                    }
                    return true;
                }))]);
        default:
            break;
    }



}