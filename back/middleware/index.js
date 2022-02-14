/*
 * Middleware: Validate
 * **************** */

const {
  validationResult
} = require('express-validator');

exports.validate = (config, module) => {
  return async (req, res, next) => {
    await Promise.all(config.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
    } else {
      switch (module) {
        case 'modalLogin':
          res.status(422).render('index', {
            modalLogin: errors.array()
          });
          break;

        case 'modalRegister':
          res.status(422).render('index', {
            modalRegister: errors.array()
          });
          break;

        case 'modalForgot':
          res.status(422).render('index', {
            modalForgot: errors.array()
          });
          break;

        default:
          break;
      }

    }
  }
}