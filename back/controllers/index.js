const { home } = require("./HomeController"),  
      { createUser, loginUser, forgot, logOut } = require("./AuthController"),
      { resetPassword, reset } = require("./ResetPassword"),
      { profilID, editProfil, comment, deleteComment } = require("./UserController"),
      { admin, editUser, banUser, archivingUser, deleteUser, addBlog, editBlog, deleteBlog, addGallery, editGallery, deleteGallery, addDiary, editDiary, deleteDiary } = require("./AdminController"),
      { sendMail } = require("./ContactController"),
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
    admin, editUser, banUser, archivingUser, deleteUser, addBlog, editBlog, deleteBlog, addGallery, editGallery, deleteGallery, addDiary, editDiary, deleteDiary,

    //Contact
    sendMail,

    //Blog
    blog, blogID

}