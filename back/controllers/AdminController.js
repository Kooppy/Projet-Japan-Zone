const fakeDB = require('../database/fakedb.json')

exports.admin = (req, res) => {
    res.render('admin', { user: fakeDB.users, blog: fakeDB.blogs, message: fakeDB.messages, galerie: fakeDB.galeries });
}