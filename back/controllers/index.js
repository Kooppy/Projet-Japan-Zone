const { home } = require("./HomeController"),
      { messagery, sendEmail, deleteMessage } = require("./MessageryController"),
      { sendMessage } = require("./ContactController"),
      { blog, blogID } = require("./BlogController"),  
      { createUser, loginUser, forgot, logOut } = require("./AuthController"),
      { resetPassword, reset } = require("./ResetPassword"),
      { profilID, editProfil, comment, deleteComment } = require("./UserController"),
      { admin, addUser, editUser, banUser, archivingUser, deleteUser, addBlog, editBlog, deleteBlog, addGallery, editGallery, deleteGallery } = require("./AdminController");

module.exports = {
    // Home
    home,

    //Contact
    sendMessage,

    //Blog
    blog, blogID,

    // Auth
    createUser, loginUser, forgot, logOut, 

    // Reset Password
    resetPassword, reset,

    // User
    profilID, editProfil, comment, deleteComment,

    //Admin
    admin, addUser, editUser, banUser, archivingUser, deleteUser, addBlog, editBlog, deleteBlog, addGallery, editGallery, deleteGallery,

    //Messagery
    messagery, sendEmail, deleteMessage

}