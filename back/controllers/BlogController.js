/*
 * Controller: Blog (Blog)
 * ************************ */ 
exports.blog = async (req, res) => {
    const { id } = req.params

    try {
        const blog = await db.query(`SELECT blog.num_blog, blog.title, blog.description, blog.contents, blog.date, pictureBank.link, pictureBank.title, pictureBank.description, tags.name
                                     FROM blog 
                                     INNER JOIN pictureBank ON pictureBank.num_blog = blog.num_blog
                                     INNER JOIN tags ON tags.num_blog = blog.num_blog;`);

        res.render('blog', {
            blog
        });

    } catch (err) {
        throw err;
    }
}

exports.blogID = async (req, res) => {
    const { id } = req.params

    try {
        const blog = await db.query(`SELECT blog.num_blog, blog.title, blog.description, blog.contents, blog.date, user.pseudo, pictureBank.link, pictureBank.title, pictureBank.description, tags.name
                                     FROM blog 
                                     INNER JOIN user ON user.num_user = blog.num_user
                                     INNER JOIN pictureBank ON pictureBank.num_blog = blog.num_blog
                                     INNER JOIN tags ON tags.num_blog = blog.num_blog
                                     WHERE blog.title= '${id}';`);

        res.render('item1', {
            blog
        });

    } catch (err) {
        throw err;
    }
}