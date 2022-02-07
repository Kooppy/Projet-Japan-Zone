/*
 * Controller: Blog (Blog)
 * ************************ */ 
const {
    pagination
} = require('../util/pagination');

exports.blog = async (req, res) => {
    const { id } = req.params

    let data = await pagination({
        numItem: 5,
        page: req.query.page,
        table: 'blog'
    });

    try {
        const blog = await db.query(`SELECT blog.num_blog, blog.title, blog.description, blog.contents, blog.date, pictureBank.link, pictureBank.title, pictureBank.description, tags.name
                                     FROM blog 
                                     INNER JOIN pictureBank ON pictureBank.num_blog = blog.num_blog
                                     INNER JOIN tags ON tags.num_blog = blog.num_blog
                                     ORDER BY blog.num_blog
                                     DESC LIMIT ${data.limit};`);

        res.render('blog', {
            blog,
            page: {
                current: data.page,
                previous: data.page > 0 ? data.page - 1 : undefined,
                next: data.page < data.numPages - 1 ? data.page + 1 : undefined
            }
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