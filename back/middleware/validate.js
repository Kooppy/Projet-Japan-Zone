/*
 * Middleware: Validate
 * **************** */

const { validationResult } = require('express-validator');

exports.validate = (req, res, next) => {

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    res.status(422).render('index', { errors: errors.array() });
  }

}