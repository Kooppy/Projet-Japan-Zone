/*
 * Middleware: Validate
 * **************** */

const {
  validationResult
} = require('express-validator');

exports.validate = (config) => {
  return async (req, res, next) => {
    await Promise.all(config.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
    } else {

      switch (req.url) {
        case '/login':
          res.status(422).render('index', {
            modalLogin: errors.array()
          });
          break;

        case '/register':
          res.status(422).render('index', {
            modalRegister: errors.array()
          });
          break;
          
        case `/blog/${req.params.id}`:
          res.status(422).render('item1', {
            commentFlash: errors.array()
          });
          break;

        default:
          break;
      }
    }
  }
}