const { home } = require("./HomeController"),
      { messagery, sendEmail, deleteMessage } = require("./MessageryController"),
      { sendMessage } = require("./ContactController"),
      { blog, blogID } = require("./BlogController"), 
      { presenting } = require('./PresentingController'),
      //{ createUser, loginUser, forgot, logOut } = require("./AuthController"),
      { resetPassword, reset } = require("./ResetPassword"),
      { profilID, editProfil, comment, deleteComment } = require("./UserController"),
      { admin, addUser, editUser, banUser, archivingUser, unBanUser, unArchivingUser, deleteUser, addBlog, editBlog, deleteBlog, addGallery, resetPictureUser, resetPictureBlog, editGallery, deleteGallery } = require("./AdminController");

module.exports = {
    // Home
    home,

    //Contact
    sendMessage,

    //Blog
    blog, blogID,

    //Presenting
    presenting,

    // Auth
    //createUser, loginUser, forgot, logOut, 

    // Reset Password
    resetPassword, reset,

    // User
    profilID, editProfil, comment, deleteComment,

    //Admin
    admin, addUser, editUser, banUser, archivingUser, unBanUser, unArchivingUser, deleteUser, addBlog, editBlog, deleteBlog, addGallery, resetPictureUser, resetPictureBlog, editGallery, deleteGallery,

    //Messagery
    messagery, sendEmail, deleteMessage

}