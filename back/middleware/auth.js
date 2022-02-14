/*
 * Middleware: Auth
 * **************** */ 


exports.isAdmin = (req, res, next) => {
    !req.session.user ? res.redirect('/') : req.session.user.isAdmin === 0 ? res.redirect('/') : next() ;
}

exports.isBan = (req, res, next) => {
    !req.session.user ? res.redirect('/') : req.session.user.isBan === 0 ? res.redirect('/') : next() ;
} 

exports.isVerify = (req, res, next) => {
    !req.session.user ? res.redirect('/') : req.session.user.isVerify === 0 ? res.redirect('/') : next() ;
} 

exports.isForgot = (req, res, next) => {
    !req.session.forgot ? res.redirect('/') : next() ;
} 