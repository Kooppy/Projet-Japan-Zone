/*
 * Router.js
 * *********** */

// Import de module
const express = require('express'),
      router = express.Router(),
      auth = require('./middleware/auth.js'),
      upload = require('./config/multer/multer.js'),
      { methodValidate } = require('./config/validator/validator.js');

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

router.route('/register').post(methodValidate('register'), createUser);

router.route('/login').post(methodValidate('login'), loginUser);

router.route('/profil/:id').get().put();

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