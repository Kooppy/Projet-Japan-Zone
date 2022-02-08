/*
 * Router.js
 * *********** */

// Import de module
const express = require('express'),
      router = express.Router(),
      auth = require('./middleware/auth.js'),
      upload = require('./config/multer/multer.js'),
      { check } = require('express-validator'),
      { validate } = require('./middleware/validate.js');

//"^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\%\@])[0-9a-zA-Z\%\@]{8,}$"
// Import des modules dans les controllers
const {
      index,
      createUser,
      loginUser,
      logOut,
      admin,
      editUser,
      banUser,
      archivingUser,
      deleteUser,
      addBlog,
      editBlog,
      deleteBlog,
      addGallery,
      editGallery,
      deleteGallery,
      addDiary,
      editDiary,
      deleteDiary,
      sendMail,
      blog,
      blogID
} = require('./controllers');

// Routes

router.route('/').get(index);

router.route('/contact').post(sendMail);

router.route('/register').post(validate(
      [//check('pseudo').isLength({min: 5}),
      //check('email').isEmail(),
      check('password')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\%\@])[0-9a-zA-Z\%\@]{8,}$/)
      .withMessage('Votre mot de passe doit contenir 1 Majuscule, 1 Minuscule, 1 Chiffre, 1 Caractère Spéciale et doit comporter au minimum 8 caractères.'),
      check('password').custom((value, { req }) => {
            if (value !== req.body.cPassword) {
              throw new Error('La confirmation de mot de passe est incorrecte !');
            }
            return true;
      })
]), createUser);

router.route('/login').post(loginUser);

router.route('/logout').delete(logOut);

router.route('/blog').get(blog);

router.route('/blog/:id').get(blogID);

router.use(auth.isAdmin)

router.route('/admin').get(admin);

router.route('/admin/user/:id').put(upload.single('picUser'), editUser).delete(deleteUser);

router.route('/admin/user/ban/:id').put(banUser);

router.route('/admin/user/archiving/:id').put(archivingUser);

router.route('/admin/blog').post(upload.single('picBlog'), addBlog);

router.route('/admin/blog/:id').put(editBlog).delete(deleteBlog);

router.route('/admin/gallery').post(addGallery);

router.route('/admin/gallery/:id').put(editGallery).delete(deleteGallery);

router.route('/admin/diary').post(addDiary);

router.route('/admin/diary/:id').put(editDiary).delete(deleteDiary);

// /Routes

// Export de notre router
module.exports = router;