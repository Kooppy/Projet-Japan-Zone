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

    let { title, id } = req.params;

    title = title === undefined ? null : title.split(' ').join('%20');

    id = id === undefined ? null : id.split(' ').join('%20');

    console.log(errors);

    if (errors.isEmpty()) {
      next();
    } else {
      switch (req.url) {

        case `/admin/user`:
          req.session.reg_error = errors.array();
          req.session.backURL = req.url;
          res.redirect(`/admin`);
          break;

        case `/admin/user/${id}?_method=PUT`:
          req.session.reg_error = errors.array();
          req.session.id = id;
          req.session.backURL = req.url;
          res.redirect(`/admin`);
          break;

        case `/admin/blog`:
          req.session.reg_error = errors.array();
          req.session.backURL = req.url;
          res.redirect(`/admin`);
          break;
  
        case `/admin/blog/${id}?_method=PUT`:
          req.session.reg_error = errors.array();
          req.session.backURL = req.url;
          res.redirect(`/admin`);
          break;

        case `/admin/gallery`:
          req.session.reg_error = errors.array();
          req.session.backURL = req.url;
          res.redirect(`/admin`);
          break;
    
        case `/admin/gallery/${id}?_method=PUT`:
          req.session.reg_error = errors.array();
          req.session.backURL = req.url;
          res.redirect(`/admin`);
          break;

        case `/profil/${id}?_method=PUT`:
          req.session.reg_error = errors.array();
          req.session.backURL = req.url;
          res.redirect(`/profil/${req.params.id}`);
          break;

        case `/profil/newPassword/${id}?_method=PUT`:
          req.session.reg_error = errors.array();
          req.session.backURL = req.url;
          res.redirect(`/profil/${req.params.id}`);
          break;

        case `/blog/${title}`:
          req.session.reg_error = errors.array();
          req.session.backURL = req.url;
          res.redirect(`/blog/${req.params.title}`);
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