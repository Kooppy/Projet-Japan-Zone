/*
 * Controller: Blog (Blog)
 * ************************ */ 

const fakeDB = require('../database/fakedb.json')

exports.blog = (req, res) => {
    res.render('blog');
}

exports.blogID = (req, res) => {
    let n = 0;
    let b = false

    while (n < fakeDB.blogs.length && b == false) {
        if (fakeDB.blogs[n].title == req.params.id) {
            res.render('item1', { blog: fakeDB.blogs[n] })
            b = true;
        } 
        n++;
    }
    if (b==false) {
        res.redirect('/')
    }
}