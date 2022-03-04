const { home } = require("./HomeController"),  
      { createUser, loginUser, forgot, logOut } = require("./AuthController"),
      { resetPassword, reset } = require("./ResetPassword"),
      { profilID, editProfil, comment, deleteComment } = require("./UserController"),
      { admin, addUser, editUser, banUser, archivingUser, deleteUser, addBlog, editBlog, deleteBlog, addGallery, editGallery, deleteGallery } = require("./AdminController"),
      { sendMessage } = require("./ContactController"),
      { blog, blogID } = require("./BlogController");

module.exports = {
    // Home
    home,

    // Auth
    createUser, loginUser, forgot, logOut, 

    // Reset Password
    resetPassword, reset,

    // User
    profilID, editProfil, comment, deleteComment,

    //Admin
    admin, addUser, editUser, banUser, archivingUser, deleteUser, addBlog, editBlog, deleteBlog, addGallery, editGallery, deleteGallery,

    //Contact
    sendMessage,

    //Blog
    blog, blogID

}