/*
 * Controller: Admin (Admin)
 * ************************ */

exports.addBlog = async (req, res) => {
    const {
        title,
        description,
        content,
        category,
        id
    } = req.body;

    try {
        const blog = await db.query(`INSERT INTO blog 
                                       SET title= :title, description= :description, contents= :content, date= NOW(), num_user= '${id}';`, {title, description, content});
        const picture = await db.query(`INSERT INTO pictureBank SET link_picture= :path, num_user= '${id}', num_blog= '${blog.insertId}';`, {path: req.file.path});
        const category_blog = await db.query(`INSERT INTO category SET name= :category, num_blog= '${blog.insertId}', num_picture= '${picture.insertId}';`, {category})

        const selectBlogId = await db.query(`
            SELECT blog.num_blog, blog.title, blog.description, blog.contents, pictureBank.link_picture, category.name
            FROM blog 
                INNER JOIN user 
                    ON user.num_user = blog.num_user
                INNER JOIN pictureBank 
                    ON pictureBank.link_picture LIKE '%blog%' AND pictureBank.num_blog = blog.num_blog
                INNER JOIN category 
                    ON category.num_blog = blog.num_blog
            WHERE blog.num_blog= ${blog.insertId};`);

        res.json({selectBlogId});
    } catch (err) {
        throw err;
    }
}

exports.editBlog = async (req, res) => {
    let {
        title,
        description,
        contents,
        category
    } = req.body;

    const { id } = req.params;

    try {

        const selectBlog = await db.query(`SELECT blog.num_blog, blog.title, blog.description, blog.contents, pictureBank.link_picture, category.name
                                           FROM blog 
                                             INNER JOIN user 
                                               ON user.num_user = blog.num_user
                                             INNER JOIN pictureBank 
                                               ON pictureBank.link_picture LIKE '%blog%' AND pictureBank.num_blog = blog.num_blog
                                             INNER JOIN category 
                                               ON category.num_blog = blog.num_blog
                                           WHERE blog.num_blog= ${id};`);

    
        title = !title ? selectBlog[0].title : title;
        description = !description ? selectBlog[0].description : description;
        contents = !contents ? selectBlog[0].contents : contents;
        category = !category ? selectBlog[0].name : category;

        const blog = await db.query(`UPDATE blog SET title= :title, description= :description, contents= :contents WHERE num_blog = '${selectBlog[0].num_blog}';`, {title, description, contents});
        const picture = await db.query(`UPDATE pictureBank SET link_picture= :link WHERE num_blog = '${selectBlog[0].num_blog}';`, {link: req.file.path});
        const category_blog = await db.query(`UPDATE category SET name= :category WHERE num_blog = '${selectBlog[0].num_blog}';`, {category});

        const selectBlogId = await db.query(`SELECT blog.num_blog, blog.title, blog.description, blog.contents, pictureBank.link_picture, category.name
                                            FROM blog 
                                            INNER JOIN user 
                                                ON user.num_user = blog.num_user
                                            INNER JOIN pictureBank 
                                                ON pictureBank.link_picture LIKE '%blog%' AND pictureBank.num_blog = blog.num_blog
                                            INNER JOIN category 
                                                ON category.num_blog = blog.num_blog
                                            WHERE blog.num_blog= ${id};`);
        
        res.json({selectBlogId});
    } catch (err) {
        throw err;
    }
}

exports.deleteBlog = async (req, res) => {
    const {
        id
    } = req.params;

    try {

        const category = await db.query(`UPDATE category INNER JOIN blog ON blog.num_blog = category.num_blog SET category.num_blog= NULL WHERE blog.num_blog = '${id}';`);
        const picture = await db.query(`UPDATE pictureBank INNER JOIN blog ON blog.num_blog = pictureBank.num_blog SET pictureBank.num_blog = NULL WHERE blog.num_blog = '${id}';`);
        const blogDelete = await db.query(`DELETE FROM blog WHERE num_blog= '${id}';`);

        const blog = await db.query(`SELECT * FROM blog;`);
        
        res.json({blog});
    } catch (err) {
        throw err;
    }
}