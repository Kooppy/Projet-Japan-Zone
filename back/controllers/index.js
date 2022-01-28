const { index } = require("./IndexController"),
      { admin, deleteUser } = require("./AdminController"),
      { createUser, loginUser, logOut } = require("./AuthController"),
      { sendMail } = require("./ContactController"),
      { blog, blogID } = require("./BlogController");

module.exports = {
    // Home
    index,

    // Auth
    createUser, loginUser, logOut, 

    //Admin
    admin, deleteUser,

    //Contact
    sendMail,

    //Blog
    blog, blogID

}