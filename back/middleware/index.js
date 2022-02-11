/*
 * Middleware: Validate
 * **************** */

const { validationResult } = require('express-validator');

exports.validate = (config) => {
  return async (req, res, next) => {
    await Promise.all(config.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
    } else {
      res.status(422).render('index', {
        errors: errors.array()
      });
    }
  }
}     