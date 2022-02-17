/*
 * Controller: Admin (Admin)
 * ************************ */
const {
    pagination
} = require('../util/pagination');
const { selectID } = require('../util/select');

exports.admin = async (req, res) => {
    let paginateUser = await pagination({
        numItem: 5,
        page: req.query.user,
        table: 'user'
    });

    let paginateBlog = await pagination({
        numItem: 5,
        page: req.query.blog,
        table: 'blog'
    });

    let paginateGallery = await pagination({
        numItem: 5,
        page: req.query.gallery,
        table: 'pictureBank'
    });

    let paginateDiary = await pagination({
        numItem: 5,
        page: req.query.diary,
        table: 'diary'
    });

    try {
        const users = await db.query(`SELECT user.num_user, user.email, user.pseudo, user.password, user.confirmation_date, pictureBank.link_picture, user_role.isVerify, user_role.isAdmin, user_role.isBan, user_address.name, user_address.first_name, user_address.address, user_address.postal_code, user_address.city, user_address.phone, user_profil.civility, user_profil.description
                                      FROM user
                                      INNER JOIN pictureBank ON pictureBank.link_picture LIKE '%user%' AND pictureBank.num_user = user.num_user
                                      INNER JOIN user_role ON user_role.num_user = user.num_user
                                      INNER JOIN user_address ON user_address.num_user = user.num_user
                                      INNER JOIN user_profil ON user_profil.num_user = user.num_user
                                      ORDER BY user.num_user
                                      DESC LIMIT ${paginateUser.limit};`);

        const blog = await db.query(`SELECT blog.num_blog, blog.title, blog.description, blog.contents, blog.date, user.pseudo, pictureBank.link_picture, category.name
                                     FROM blog 
                                     INNER JOIN user ON user.num_user = blog.num_user
                                     INNER JOIN pictureBank ON pictureBank.link_picture LIKE '%blog%' AND pictureBank.num_blog = blog.num_blog
                                     INNER JOIN category ON category.num_blog = blog.num_blog
                                     ORDER BY blog.num_blog
                                     DESC LIMIT ${paginateBlog.limit};`);

        const galleryAll = await db.query(`SELECT link_picture FROM pictureBank ORDER BY pictureBank.num_picture DESC LIMIT ${paginateGallery.limit};`)

        const galleryInfo = await db.query(`SELECT pictureBank.num_picture, pictureBank.title_picture, pictureBank.description_picture, user.pseudo, blog.title, category.name
                                        FROM pictureBank
                                        INNER JOIN user ON user.num_user = pictureBank.num_user
                                        INNER JOIN blog ON blog.num_blog = pictureBank.num_blog
                                        INNER JOIN category ON category.num_picture = pictureBank.num_picture;`);

        const diary = await db.query(`SELECT diary.num_diary, diary.date, diary.contents, user.pseudo
                                      FROM diary
                                      INNER JOIN user ON user.num_user = diary.num_user
                                      ORDER BY diary.num_diary
                                      DESC LIMIT ${paginateDiary.limit};`);

        if (paginateUser.page.current <= paginateUser.page.total) {
            res.render('admin', {
                layout: 'adminLayout',
                users,
                pageUser: paginateUser.page,
                blog,
                pageBlog: paginateBlog.page,
                galleryAll,
                galleryInfo,
                pageGallery: paginateGallery.page,
                diary,
                pageDiary: paginateDiary.page
            });
        } else {
            res.redirect('/admin');
        }
    } catch (err) {
        throw err;
    }
}

exports.editUser = async (req, res) => {
    let {
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
        const selectUser = await db.query(`SELECT user.num_user, user.email, user.pseudo, user.password, pictureBank.link_picture, user_role.isVerify, user_role.isAdmin, user_role.isBan, user_address.name, user_address.first_name, user_address.address, user_address.postal_code, user_address.city, user_address.phone, user_profil.civility, user_profil.description
                                           FROM user
                                           INNER JOIN pictureBank ON pictureBank.link_picture LIKE '%user%' AND pictureBank.num_user = user.num_user
                                           INNER JOIN user_role ON user_role.num_user = user.num_user
                                           INNER JOIN user_address ON user_address.num_user = user.num_user
                                           INNER JOIN user_profil ON user_profil.num_user = user.num_user
                                           WHERE user.num_user = ${req.params.id};`)

        pseudo = !pseudo ? selectUser[0].pseudo : pseudo;
        email = !email ? selectUser[0].email : email;
        name = !name ? selectUser[0].name : name;
        first_name = !first_name ? selectUser[0].first_name : first_name;
        address = !address ? selectUser[0].address : address;
        postal_code = !postal_code ? selectUser[0].postal_code : postal_code;
        city = !city ? selectUser[0].city : city;
        phone = !phone ? selectUser[0].phone : phone;
        civility = !civility ? selectUser[0].civility : civility;
        description = !description ? selectUser[0].description : description;
        password = !password ? selectUser[0].password : password;
        isVerify = !isVerify ? selectUser[0].isVerify : isVerify;
        isAdmin = !isAdmin ? selectUser[0].isAdmin : isAdmin;
        isBan = !isBan ? selectUser[0].isBan : isBan;
        isArchiving = !isArchiving ? selectUser[0].isArchiving : isArchiving;

        console.log(pseudo);
        // const user = await db.query(`UPDATE user SET isBan = true WHERE num_user = '${req.params.id}';`);
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
        const user_ban = await db.query(`UPDATE user_role SET isBan= true WHERE num_user = '${id}';`);
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
        const user_archiving = await db.query(`UPDATE user_role SET isArchiving = true WHERE num_user = '${id}';`);
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
        const pictureUser = await db.query(`DELETE FROM pictureBank WHERE num_user= ${id}`)
        const user = await db.query(`
            DELETE user_role, user_profil, user_address, user 
            FROM user
                RIGHT JOIN user_role 
                    ON user_role.num_user = user.num_user 
                RIGHT JOIN user_profil 
                    ON user_profil.num_user = user.num_user 
                RIGHT JOIN user_address 
                    ON user_address.num_user = user.num_user 
            WHERE user.num_user = '${id}';
        `);
    } catch (err) {
        throw err;
    }
    res.redirect('back');
}

exports.addBlog = async (req, res) => {
    const {
        title,
        description,
        content,
        categorie
    } = req.body;

    try {
        const blog = await db.query(`INSERT INTO blog SET title= :title, description= :description, contents= :content, date= NOW(), num_user= '${req.session.user.id}';`, {title, description, content});
        const picture = await db.query(`INSERT INTO pictureBank SET link_picture= :path, num_user= '${req.session.user.id}', num_blog= '${blog.insertId}';`, {path: req.file.path});
        const category = await db.query(`INSERT INTO category SET name= :categorie, num_blog= '${blog.insertId}', num_picture= '${picture.insertId}';`, {categorie})
    } catch (err) {
        throw err;
    }
    res.redirect('back');
}

exports.editBlog = async (req, res) => {
    let {
        title,
        description,
        contents,
        date,
        pseudo,
        link_picture,
        name
    } = req.body;

    try {
        const selectBlog = await db.query(`SELECT blog.num_blog, blog.title, blog.description, blog.contents, blog.date, user.pseudo, pictureBank.link_picture, category.name
                                     FROM blog 
                                     INNER JOIN user ON user.num_user = blog.num_user
                                     INNER JOIN pictureBank ON pictureBank.link_picture LIKE '%blog%' AND pictureBank.num_blog = blog.num_blog
                                     INNER JOIN category ON category.num_blog = blog.num_blog
                                     WHERE num_blog= ${req.params.id} ;`);

        title = !title ? selectBlog[0].title : title;
        description = !description ? selectBlog[0].description : description;
        contents = !contents ? selectBlog[0].contents : contents;
        date = !date ? selectBlog[0].date : date;
        pseudo = !pseudo ? selectBlog[0].pseudo : pseudo;
        link_picture = !link_picture ? selectBlog[0].link_picture : link_picture;
        name = !name ? selectBlog[0].name : name;
        
        // const blog = await db.query(`UPDATE user SET isBan = true WHERE num_user = '${req.params.id}';`);
        res.redirect('back');
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
        const blog = await db.query(`DELETE FROM blog WHERE num_blog= '${id}';`);
    } catch (err) {
        throw err;
    }
    res.redirect('back');
}

exports.addGallery = async (req, res) => {
    const {
        title, 
        description,
        name
    } = req.body;

    try {
        const picture = await db.query(`INSERT INTO pictureBank SET link_picture= :path, title_picture= :title, description_picture= :description, num_user= '${req.session.user.id}';`, {path: req.file.path, title, description});
        const category = await db.query(`INSERT INTO category SET name= '${name}', num_picture= '${picture.insertId}';`);
        res.redirect('back');
    } catch (err) {
        throw err;
    }
}

exports.editGallery = async (req, res) => {
    let {
        link_picture,
        title_picture,
        description_picture,
        name
    } = req.body;

    try {
        const selectGallery = await db.query(`SELECT pictureBank.num_picture, pictureBank.link_picture, pictureBank.title_picture, pictureBank.description_picture, user.pseudo, category.name
                                        FROM pictureBank
                                        INNER JOIN user ON user.num_user = pictureBank.num_user
                                        INNER JOIN blog ON blog.num_blog = pictureBank.num_blog
                                        INNER JOIN category ON category.num_picture = pictureBank.num_picture
                                        WHERE num_picture= ${req.params.id}`);;

        link_picture = !link_picture ? selectGallery[0].link_picture : link_picture;
        title_picture = !title_picture ? selectGallery[0].title_picture : title_picture;
        description_picture = !description_picture ? selectGallery[0].description_picture : description_picture;
        name = !name ? selectGallery[0].name : name;
        
        // const blog = await db.query(`UPDATE user SET isBan = true WHERE num_user = '${req.params.id}';`);
        res.redirect('back');
    } catch (err) {
        throw err;
    }
}

exports.deleteGallery = async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const picture_category = await db.query(`DELETE category,pictureBank FROM category left join pictureBank ON category.num_picture = pictureBank.num_picture WHERE category.num_picture= '${id}';`);
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