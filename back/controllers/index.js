const { index } = require("./IndexController"),  
      { createUser, loginUser, forgot, logOut } = require("./AuthController"),
      { resetPassword, reset } = require("./ResetPassword"),
      //{  } = require("./UserController"),
      { admin, editUser, banUser, archivingUser, deleteUser, addBlog, editBlog, deleteBlog, addGallery, editGallery, deleteGallery, addDiary, editDiary, deleteDiary } = require("./AdminController"),
      { sendMail } = require("./ContactController"),
      { blog, blogID } = require("./BlogController");

module.exports = {
    // Home
    index,

    // Auth
    createUser, loginUser, forgot, logOut, 

    // Reset Password

    resetPassword, reset,

    // User
    

    //Admin
    admin, editUser, banUser, archivingUser, deleteUser, addBlog, editBlog, deleteBlog, addGallery, editGallery, deleteGallery, addDiary, editDiary, deleteDiary,

    //Contact
    sendMail,

    //Blog
    blog, blogID

}