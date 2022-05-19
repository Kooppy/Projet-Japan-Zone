const { home } = require("./HomeController"),
      { mention } =require("./MentionController"),
      { messagery, sendEmail, deleteMessage } = require("./MessageryController"),
      { sendMessage } = require("./ContactController"),
      { blog, blogID } = require("./BlogController"), 
      { presenting } = require('./PresentingController'),
      //{ createUser, loginUser, forgot, logOut } = require("./AuthController"),
      { resetPassword, reset } = require("./ResetPassword"),
      { profilID, editProfil, newPasswordProfil, archivingProfil, comment, deleteComment, requestVerifyUpdate } = require("./UserController"),
      { verifyUpdate } = require("./VerifyController"),
      { admin, addUser, editUser, banUser, archivingUser, unBanUser, unArchivingUser, deleteUser, addBlog, editBlog, deleteBlog, addGallery, resetPictureUser, resetPictureBlog, editGallery, deleteGallery } = require("./AdminController");

module.exports = {
    // Home
    home,

    // Mention
    mention,

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
    profilID, editProfil, newPasswordProfil, archivingProfil, comment, deleteComment, requestVerifyUpdate,

    // Verify Update
    verifyUpdate,

    //Admin
    admin, addUser, editUser, banUser, archivingUser, unBanUser, unArchivingUser, deleteUser, addBlog, editBlog, deleteBlog, addGallery, resetPictureUser, resetPictureBlog, editGallery, deleteGallery,

    //Messagery
    messagery, sendEmail, deleteMessage

}