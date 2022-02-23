const { addBlog, editBlog, deleteBlog } = require("./AdminController"),
      { blog, blogID } = require("./BlogController");

module.exports = {

    //Admin
    addBlog, editBlog, deleteBlog,

    //Blog
    blog, blogID
}