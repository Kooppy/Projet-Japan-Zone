/*
 * Router.js
 * *********** */

// Import de module
const express = require('express'),
      router = express.Router(),
      upload = require('./config/multer'),
      { configComment } = require('./config/validator'),
      { validate } = require('./middleware/index.js');


// Import des modules dans les controllers
const {
      comment,
      deleteComment,
      addBlog,
      editBlog,
      deleteBlog,
      blog,
      blogID
} = require('./controllers'); 

// Routes

router.route('/blog').get(blog);

router.route('/blog/:id').get(blogID).post(validate(configComment()), comment);

router.route('/comment/:id').delete(deleteComment);

router.route('/admin/blog').post(upload.single('picBlog'), addBlog);

router.route('/admin/blog/:id').put(upload.single('picBlog'), editBlog).delete(deleteBlog);

// /Routes

// Export de notre router
module.exports = router;