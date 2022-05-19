/*
 * Controller: Blog (Blog)
 * ************************ */

const {
    pagination
} = require('../util/pagination');

exports.blog = async (req, res) => {

    let pagiBlog = await pagination({
        numItem: 6,
        page: req.query.page,
        table: 'blog'
    });

    try {
        const blog = await db.query(`SELECT blog.num_blog, blog.title, blog.description, blog.contents, blog.date, pictureBank.link_picture, category.name
                                     FROM blog 
                                     INNER JOIN pictureBank ON pictureBank.num_blog = blog.num_blog
                                     INNER JOIN category ON category.num_blog = blog.num_blog
                                     ORDER BY blog.num_blog
                                     DESC LIMIT ${pagiBlog.limit};`);

        res.render('blog', {
            blog,
            namePage: 'Blog',
            paginate: pagiBlog.page
        });

    } catch (err) {
        throw err;
    }
}

exports.blogID = async (req, res) => {
    let {
        title
    } = req.params;

    const flash = req.session.reg_error;
    const backURL = req.session.backURL;

    console.log(backURL);

    console.log('erreur blog',flash);

    req.session.backURL = '';
    req.session.reg_error = '';

    try {

        const blogId = await db.query(`SELECT blog.num_blog, blog.title, blog.description, blog.contents, blog.date, user.pseudo, pictureBank.link_picture, category.name
                                     FROM blog 
                                     INNER JOIN user ON user.num_user = blog.num_user
                                     INNER JOIN pictureBank ON pictureBank.link_picture LIKE '%blog%' AND pictureBank.num_blog = blog.num_blog
                                     INNER JOIN category ON category.num_blog = blog.num_blog
                                     WHERE blog.title= :title;`, {title});

        const blogAuthor = await db.query(`SELECT user.pseudo, pictureBank.link_picture
                                           FROM blog 
                                             INNER JOIN user ON user.num_user = blog.num_user
                                             INNER JOIN pictureBank ON pictureBank.link_picture LIKE '%user%' AND pictureBank.num_user = blog.num_user
                                           WHERE blog.title= :title;`, {title})

        let paginateComment = await pagination({
            numItem: 6,
            page: req.query.page,
            table: `comment WHERE num_blog = ${blogId[0].num_blog}`
        });

        const comment = await db.query(`SELECT comment.num_comment, comment.contents, comment.date, comment.num_user, user.pseudo , pictureBank.link_picture
                                        FROM comment
                                        INNER JOIN user ON user.num_user = comment.num_user
                                        INNER JOIN pictureBank ON pictureBank.link_picture LIKE '%user%' AND pictureBank.num_user = comment.num_user
                                        WHERE comment.num_blog = ${blogId[0].num_blog}
                                        ORDER BY comment.num_comment ASC
                                        LIMIT ${paginateComment.limit};`)

        title = title === undefined ? null : title.split(' ').join('%20');

        if (paginateComment.page.current <= paginateComment.page.total || paginateComment.page.current === 1) {
            switch (backURL) {
                case `/blog/${title}`:
                    console.log('erreur ergger erhgeh');
                    res.render('item1', {
                        blog: blogId[0],
                        namePage: 'Item Blog',
                        author: blogAuthor[0],
                        comment,
                        pageComment: paginateComment.page,
                        commentError: flash
                    });
                    break;
            
                default:
                    res.render('item1', {
                        blog: blogId[0],
                        namePage: 'Item Blog',
                        author: blogAuthor[0],
                        comment,
                        pageComment: paginateComment.page
                    });
                    break;
            }
        } else {
            res.redirect(`/blog/${title}`)
        }

    } catch (err) {
        throw err;
    }
}