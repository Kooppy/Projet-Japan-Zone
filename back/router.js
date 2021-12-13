/*
 * Router.js
 * *********** */ 

// Import de module
const express = require('express'), 
      router = express.Router(),
      auth = require('./middleware/auth.js'),
      fakeDB = require('./database/fakedb.json');

      // Import des controllers
const IndexController = require('./controllers/IndexController'),
      BlogController = require('./controllers/BlogController'),
      AdminController = require('./controllers/AdminController');

// Routes
router.route('/')
      .get(IndexController.index)
      .post(IndexController.createUser);

router.route('/blog')
      .get(BlogController.blog);

router.route('/blog/:id')
      .get(BlogController.blogID);

router.route('/admin')
      .get(AdminController.admin);

router.route('/admin/:id')
      .delete(AdminController.delete);
// /Routes

// Export de notre router
module.exports = router;
