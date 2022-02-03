/*
 * Controller: Admin (Admin)
 * ************************ */
exports.admin = async (req, res) => {
    try {
        const user = await db.query(`SELECT user.num_user, user.email, user.pseudo, user.password, user.confirmation_date, pictureBank.link, user_role.isVerify, user_role.isAdmin, user_role.isBan, user_address.name, user_address.first_name, user_address.address, user_address.postal_code, user_address.city, user_address.phone, user_profil.civility, user_profil.description
                                      FROM user
                                      INNER JOIN pictureBank ON pictureBank.num_user = user.num_user
                                      INNER JOIN user_role ON user_role.num_user = user.num_user
                                      INNER JOIN user_address ON user_address.num_user = user.num_user
                                      INNER JOIN user_profil ON user_profil.num_user = user.num_user;`);

        // const blog = await db.query(`SELECT blog.num_blog, blog.title, blog.description, blog.contents, blog.article_date, user.pseudo, pictureBank.link, pictureBank.title, pictureBank.description, tags.name
        //                              FROM blog 
        //                              INNER JOIN user ON user.num_user = blog.num_user
        //                              INNER JOIN pictureBank ON pictureBank.num_blog = blog.num_blog
        //                              INNER JOIN tags ON tags.num_blog = blog.num_blog;`);

        // const gallery = await db.query(`SELECT pictureBank.num_picture, pictureBank.link, pictureBank.title, pictureBank.description, user.pseudo, blog.title, tags.name
        //                                 FROM pictureBank
        //                                 INNER JOIN user ON user.num_user = pictureBank.num_user
        //                                 INNER JOIN blog ON blog.num_blog = pictureBank.num_blog
        //                                 INNER JOIN tags ON tags.num_picture = pictureBank.num_picture;`);

        // const diary = await db.query(`SELECT diary.num_diary, diary.date, diary.contents, user.pseudo
        //                               INNER JOIN user ON user.num_user = diary.num_user;`);

        res.render('admin', {
            user
            // blog,
            // gallery,
            // diary
        });
    } catch (err) {
        throw err;
    }
}

exports.editUser = async (req, res) => {
    const {
        pseudo,
        email,
        name,
        first_name,
        address,
        postal_code,
        city,
        phone,
        civility,
        description,
        password,
        isVerify,
        isAdmin,
        isBan,
        isArchiving
    } = req.body;

    try {
        const user = await db.query(`UPDATE user SET isBan = true WHERE num_user = '${id}';`);
        res.redirect('back');
    } catch (err) {
        throw err;
    }
}

exports.banUser = async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const user_ban = await db.query(`UPDATE user_role SET isBan = true WHERE num_user = '${id}';`);
        const session_kill = await db.query(`DELETE FROM sessions WHERE data LIKE '%"id":${id}%';`);
        res.redirect('back');
    } catch (err) {
        throw err;
    }
}

exports.archivingUser = async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const user_ban = await db.query(`UPDATE user_role SET isArchiving = true WHERE num_user = '${id}';`);
        const session_kill = await db.query(`DELETE FROM sessions WHERE data LIKE '%"id":${id}%';`);
        res.redirect('back');
    } catch (err) {
        throw err;
    }
}


exports.deleteUser = async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const user = await db.query(`
            DELETE user_role, user_profil, user_address, user 
            FROM user
                right JOIN user_role 
                    ON user_role.num_user = user.num_user 
                right JOIN user_profil 
                    ON user_profil.num_user = user.num_user 
                right JOIN user_address 
                    ON user_address.num_user = user.num_user 
            WHERE user.num_user = '${id}';
        `);
    } catch (err) {
        throw err;
    }
}

exports.addBlog = async (req, res) => {
    const {
        title,
        description,
        content,
        name
    } = req.body;

    try {
        const blog = await db.query(`INSERT INTO blog SET title= '${title}', description= '${description}', contents= '${content}', article_date= NOW(), num_user= '${req.session.user.id}';`);
        const picture = await db.query(`INSERT INTO pictureBank SET link_picture= '${req.file.filename}', num_user= '${req.session.user.id}', num_blog= '${blog.insertID}';`);
        const tags = await db.query(`INSERT INTO tags SET name= '${name}', num_blog= '${blog.insertID}', num_picture= '${picture.insertID}';`)

        res.redirect('back');
    } catch (err) {
        throw err;
    }
}

exports.editBlog = async (req, res) => {

}

exports.deleteBlog = async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const tag = await db.query(`UPDATE tags INNER JOIN blog ON blog.num_blog = tags.num_blog SET tags.num_blog = NULL WHERE blog.num_blog = '${id}';`);
        const picture = await db.query(`UPDATE pictureBank INNER JOIN blog ON blog.num_blog = pictureBank.num_blog SET pictureBank.num_blog = NULL WHERE blog.num_blog = '${id}';`);
        const blog = await db.query(`DELETE FROM blog WHERE num_blog = '${id}';`);
    } catch (err) {
        throw err;
    }
}

exports.addGallery = async (req, res) => {
    const {
        name
    } = req.body;

    try {
        const picture = await db.query(`INSERT INTO pictureBank SET link_picture= '${req.file.filename}', num_user= '${req.session.user.id}';`);
        const tags = await db.query(`INSERT INTO tags SET name= '${name}', num_blog= '${blog.insertID}', num_picture= '${picture.insertID}';`);
        res.redirect('back');
    } catch (err) {
        throw err;
    }
}

exports.editGallery = async (req, res) => {

}

exports.deleteGallery = async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const picture_tag = await db.query(`DELETE tags,pictureBank FROM tags left join pictureBank ON tags.num_picture = pictureBank.num_picture WHERE tags.num_picture= '${id}';`);
        res.redirect('back');
    } catch (err) {
        throw err;
    }
}

exports.addDiary = async (req, res) => {
    const {
        date,
        contents
    } = req.body;

    try {
        const diary = await db.query(`INSERT INTO diary SET date= '${date}', contents= '${contents}', num_user= '${req.session.user.id}';`);
        res.redirect('back');
    } catch (err) {
        throw err;
    }
}

exports.editDiary = async (req, res) => {

}

exports.deleteDiary = async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const diary = await db.query(`DELETE FROM diary WHERE num_diary= '${id}';`);
        res.redirect('back');
    } catch (err) {
        throw err;
    }

}