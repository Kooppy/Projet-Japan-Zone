/*
 * Router.js
 * *********** */

// Import de module
const express = require('express'),
      router = express.Router(),
      auth = require('./middleware/auth.js'),
      upload = require('./config/multer.js')
fakeDB = require('./database/fakedb.json');

// Import des modules dans les controllers
const {
      index,
      createUser,
      loginUser,
      logOut,
      admin,
      deleteUser,
      sendMail,
      blog,
      blogID
} = require('./controllers');

// Routes

router.route('/').get(index);

router.route('/contact').post(sendMail);

router.route('/register').post(createUser);

router.route('/login').post(loginUser);

router.route('/logout').delete(logOut);

router.route('/blog').get(blog);

router.route('/blog/:id').get(blogID);

router.route('/admin').get(admin);

router.route('/admin/:id').delete(deleteUser);

// /Routes

// Export de notre router
module.exports = router;