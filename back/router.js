const express = require('express'), 
      router = express.Router(),
      auth = require('./middleware/auth.js')

const IndexController = require('./controllers/IndexController'),
      BlogController = require('./controllers/BlogController'),
      //Item1Controller = require('./controllers/Item1Controller'),
      AdminController = require('./controllers/AdminController');

router.route('/').get(IndexController.index);
router.route('/blog').get(BlogController.blog);
//router.route('/blog/item1').get(Item1Controller.item1);
router.route('/admin').get(auth.admin, AdminController.admin);

module.exports = router;
