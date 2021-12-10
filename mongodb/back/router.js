/*
 * Router.js
 * *********** */ 

// Import de module
const express = require('express'), 
      router = express.Router(),
      auth = require('./middleware/auth.js')

      // Import des controllers
const IndexController = require('./controllers/IndexController'),
      BlogController = require('./controllers/BlogController'),
      //Item1Controller = require('./controllers/Item1Controller'),
      AdminController = require('./controllers/AdminController');

// Routes
router.route('/').get(IndexController.index);
router.route('/blog').get(BlogController.blog);
//router.route('/blog/item1').get(Item1Controller.item1);
router.route('/admin').get(AdminController.admin);
// /Routes

// Export de notre router
module.exports = router;
