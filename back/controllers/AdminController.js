/*
 * Controller: Admin (Admin)
 * ************************ */ 

const fakeDB = require('../database/fakedb.json');

exports.admin = (req, res) => {
    let sql = `SELECT * FROM user`

    db.query(sql, (err, data) => {
        if (err) console.log('errors : ' + err.stack)
        console.log(data)
        res.render('admin', {
            user: data,
            blog: fakeDB.blogs,
            message: fakeDB.messages,
            galerie: fakeDB.galeries
        });
    })

}

exports.delete = (req, res) => {
    let sql = `DELETE FROM user WHERE num_user = ?`

    db.query(sql, req.params.id, (err) => {
        if (err) console.log('errors : ' + err.stack);
        res.redirect('back');
    })
}