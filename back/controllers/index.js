const { index } = require("./IndexController"),
      { admin, editUser, banUser, archivingUser, deleteUser, addBlog, editBlog, deleteBlog, addGallery, editGallery, deleteGallery, addDiary, editDiary, deleteDiary } = require("./AdminController"),
      { createUser, loginUser, logOut } = require("./AuthController"),
      { sendMail } = require("./ContactController"),
      { blog, blogID } = require("./BlogController");

module.exports = {
    // Home
    index,

    // Auth
    createUser, loginUser, logOut, 

    //Admin
    admin, editUser, banUser, archivingUser, deleteUser, addBlog, editBlog, deleteBlog, addGallery, editGallery, deleteGallery, addDiary, editDiary, deleteDiary,

    //Contact
    sendMail,

    //Blog
    blog, blogID

}