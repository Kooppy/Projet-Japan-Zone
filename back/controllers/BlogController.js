/*
 * Controller: Blog (Blog)
 * ************************ */ 

const fakeDB_blog = require('../database/fakedb.json').blogs

exports.blog = (req, res) => {
    res.render('blog');
}

exports.blogID = async (req, res) => {

   
    let blog = {}

    fakeDB_blog.forEach(bl => {
        if (bl.title === req.params.id) {
            console.log("test ",bl);
            
            blog = bl
            console.log("test2 ",!blog);
        }
    })

    if (!blog.id) {
        res.redirect('/')
    } else {
        res.render('item1', {blog})
        console.log("test 3", !blog);
    }
}