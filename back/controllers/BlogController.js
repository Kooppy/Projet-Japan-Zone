/*
 * Controller: Blog (Blog)
 * ************************ */ 

const fakeDB_blog = require('../database/fakedb.json').blogs

exports.blog = (req, res) => {
    res.render('blog');
}

exports.blogID = (req, res) => {
    let blog = {}
    /*let n = 0;
    let b = false*/

    /*while (n < fakeDB.blogs.length && b == false) {
        if (fakeDB.blogs[n].title == req.params.id) {
            res.render('item1', { blog: fakeDB.blogs[n] })
            b = true;
        } 
        n++;
    }
    if (b==false) {
        res.redirect('/')
    }*/

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