/*
 * Router.js
 * *********** */

// Import de module
const express = require('express'),
      router = express.Router(),
      upload = require('../config/multer'),
      sharp = require('../config/sharp');


// Import des modules dans les controllers
const {
      addBlog,
      editBlog,
      deleteBlog,
      blog,
      blogID
} = require('./controller-api'); 

// Routes

router.route('/blog').get(blog);

router.route('/blog/:id').get(blogID)

router.route('/admin/blog').post(upload.single('picBlog'), sharp, addBlog);

router.route('/admin/blog/:id').put(upload.single('picBlog'), sharp, editBlog).delete(deleteBlog);

// /Routes

// Export de notre router
module.exports = router;