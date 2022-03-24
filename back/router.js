/*
 * Router.js
 * *********** */

// Import de module
const express = require('express'),
      router = express.Router(),
      auth = require('./middleware/auth.js'),
      upload = require('./config/multer'),
      {  configRegister, configLogin, configForgot, configResetPassword, configComment, configEditUser, configSendMessage } = require('./config/validator'),
      { validate } = require('./middleware/index.js'),
      sharp = require('./config/sharp');


// Import des modules dans les controllers
const {
      home,
      sendMessage,
      blog,
      blogID,
      createUser,
      loginUser,
      forgot,
      profilID,
      editProfil,
      comment,
      deleteComment,
      logOut,
      resetPassword, 
      reset,
      admin,
      addUser,
      editUser,
      banUser,
      unBanUser,
      archivingUser,
      unArchivingUser,
      deleteUser,
      addBlog,
      editBlog,
      deleteBlog,
      addGallery,
      resetPictureUser,
      resetPictureBlog,
      editGallery,
      deleteGallery,
      messagery,
      sendEmail,
      deleteMessage
} = require('./controllers'); 

// Routes

router.route('/').get(home);

router.route('/contact').post(validate(configSendMessage()), sendMessage);

router.route('/blog').get(blog);

router.route('/blog/:title').get(blogID).post(validate(configComment()), comment);

router.route('/comment/:id').delete(deleteComment);

router.route('/register').post(validate(configRegister()), createUser);

router.route('/login').post(validate(configLogin()), loginUser);

router.route('/profil/:id').get(auth.isVerify, profilID).put(validate(configEditUser()), upload.single('picUser'), sharp, editProfil);

router.route('/logout').delete(logOut);

router.route('/forgot').post(validate(configForgot()), forgot);

router.route('/resetPassword/:id').get(auth.isForgot, resetPassword).put(validate(configResetPassword()), reset);

//router.use(auth.isAdmin)

router.route('/admin').get(auth.isAdmin, admin);

router.route('/admin/user').post(auth.isAdmin, addUser);

router.route('/admin/user/:id').put(auth.isAdmin, upload.single('picUser'), sharp, editUser).delete(deleteUser);

router.route('/admin/user/ban/:id').put(auth.isAdmin, banUser);

router.route('/admin/user/unBan/:id').put(auth.isAdmin, unBanUser);

router.route('/admin/user/archiving/:id').put(auth.isAdmin, archivingUser);

router.route('/admin/user/unArchiving/:id').put(auth.isAdmin, unArchivingUser);

router.route('/admin/blog').post(auth.isAdmin, upload.single('picBlog'), sharp, addBlog);

router.route('/admin/blog/:id').put(auth.isAdmin, upload.single('picBlog'), sharp, editBlog).delete(auth.isAdmin, deleteBlog);

router.route('/admin/gallery').post(auth.isAdmin, upload.single('picGallery'), sharp, addGallery);

router.route('/admin/gallery/resetUser/:id').put(auth.isAdmin, resetPictureUser);

router.route('/admin/gallery/resetBlog/:id').put(auth.isAdmin, resetPictureBlog);

router.route('/admin/gallery/:id').put(auth.isAdmin, upload.single('picGallery'), sharp, editGallery).delete(auth.isAdmin, deleteGallery);

router.route('/admin/messagery').get(auth.isAdmin, messagery).post(auth.isAdmin, validate(configSendMessage()), sendEmail)

router.route('/admin/messagery/:id').delete(auth.isAdmin, deleteMessage)

// /Routes

// Export de notre router
module.exports = router;