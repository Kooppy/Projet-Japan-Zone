const { comment, deleteComment } = require("./UserController"),
      { addBlog, editBlog, deleteBlog } = require("./AdminController"),
      { blog, blogID } = require("./BlogController");

module.exports = {
    // User
    comment, deleteComment,

    //Admin
    addBlog, editBlog, deleteBlog,

    //Blog
    blog, blogID
}