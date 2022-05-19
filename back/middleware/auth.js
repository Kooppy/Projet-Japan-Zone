/*
 * Middleware: Auth
 * **************** */ 

const { selectID } = require('../util/select')

exports.isAdmin = async (req, res, next) => {
    // const isAdminExists = await selectID('isAdmin', 'user_role', 'num_user= :value', req.session.user.id);

    if (!req.session.user) {
        res.status(404).render('err404')
    } else {
        const isAdminExists = await selectID('isAdmin', 'user_role', 'num_user= :value', req.session.user.id);

        if (isAdminExists.isAdmin === req.session.user.isAdmin) {
            next()
        } else {
            res.redirect('/')
        }

    }

    // !req.session.user ? res.status(404).render('err404') : isAdminExists.isAdmin === req.session.user.isAdmin ? next() : res.redirect('/') ;
}

exports.isVerify = (req, res, next) => {
    !req.session.user ? res.redirect('/') : req.session.user.isVerify === 0 ? res.redirect('/') : next() ;
} 

exports.isForgot = (req, res, next) => {
    !req.session.forgot ? res.redirect('/') : next() ;
} 

exports.isRequestVerify = (req, res, next) => {
    !req.session.verify ? res.redirect('/') : next() ;
} 

exports.isBlogExists = async (req, res, next) => {
    const isBlogExists = await selectID('count(*) as num', 'blog', 'title= :value', req.params.title);

    isBlogExists.num === 0 ? res.status(404).render('err404') : next() ;
} 

exports.isProfilExists = async (req, res, next) => {
    const isProfilExists = await selectID('count(*) as num', 'user', 'pseudo= :value', req.params.id);

    isProfilExists.num === 0 ? res.status(404).render('err404') : next() ;
} 