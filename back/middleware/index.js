/*
 * Middleware: Validate
 * **************** */

const {
  validationResult
} = require('express-validator');


const url = require('url')

exports.validate = (config) => {
  return async (req, res, next) => {
    await Promise.all(config.map(validation => validation.run(req)));

    const errors = validationResult(req);
    console.log(errors);

    if (errors.isEmpty()) {
      next();
    } else {
      
      switch (req.url) {
        // case '/login':
        //   req.session.reg_error = errors.array()
        //   console.log('regergg',req.session.reg_error);
        //   // res.status(422).render('index', {
        //   //   blog, gallery, 
        //   //   blogActive: blog[0],
        //   //   modalLogin: errors.array()
        //   // });
        //   res.redirect('/');
        //   break;
        // case '/forgot':
        //   res.status(422).render('index', {
        //     modalForgot: errors.array()
        //   });
        //   break;

        // case '/register':
        //   res.status(422).render('index', {
        //     modalRegister: errors.array()
        //   });
        //   break;
          
        case `/blog/${req.params.id}`:
          res.status(422).render('item1', {
            commentFlash: errors.array()
          });
          break;

        default:
          req.session.reg_error = errors.array();
          req.session.backURL = req.url;
          res.redirect('/');
          break;
      }
    }
  }
}