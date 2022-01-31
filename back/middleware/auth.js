/*
 * Middleware: Auth
 * **************** */ 


exports.isAdmin = (req, res, next) => {
    !req.session.user ? res.redirect('/') : !req.session.user.isAdmin ? res.redirect('/') : next() ;
}

exports.isBan = (req, res, next) => {
    !req.session.user ? res.redirect('/') : !req.session.user.isBan ? res.redirect('/') : next() ;
} 

exports.isVerify = (req, res, next) => {
    !req.session.user ? res.redirect('/') : !req.session.user.isVerify ? res.redirect('/') : next() ;
} 
