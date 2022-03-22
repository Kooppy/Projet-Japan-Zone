/*
 * Controller: Admin (Admin)
 * ************************ */
const {
    pagination
} = require('../util/pagination');
const { hash } =require('../util/hash')
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
    let name = req.url.split(/(\d)/);

    try {
        const users = await db.query(`SELECT user.num_user, user.email, user.pseudo, user.password, user.confirmation_date, pictureBank.link_picture, user_role.isVerify, user_role.isAdmin, user_role.isBan, user_role.isArchiving, user_address.name, user_address.first_name, user_address.address, user_address.postal_code, user_address.city, user_address.phone, user_profil.civility, user_profil.description
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

        const gallery = await db.query(`SELECT pictureBank.num_picture, pictureBank.link_picture, pictureBank.title_picture, pictureBank.description_picture, user.pseudo, blog.title, category.name
                                        FROM pictureBank
                                        INNER JOIN user ON user.num_user = pictureBank.num_user
                                        LEFT JOIN blog ON blog.num_blog = pictureBank.num_blog
                                        LEFT JOIN category ON category.num_picture = pictureBank.num_picture
                                        ORDER BY pictureBank.num_picture DESC 
                                        LIMIT ${paginateGallery.limit};`);


        if (paginateUser.page.current <= paginateUser.page.total || paginateBlog.page.current <= paginateBlog.page.total || paginateGallery.page.current <= paginateGallery.page.total) {
            res.render('admin', {
                layout: 'adminLayout',
                users,
                pageUser: paginateUser.page,
                blog,
                pageBlog: paginateBlog.page,
                gallery,
                pageGallery: paginateGallery.page,
                query: name[0].split('/admin?').join('').split('=').join('')
            });
        } else {
            res.redirect('/admin');
        }
    } catch (err) {
        throw err;
    }
}

exports.addUser = async (req, res) => {
    let { pseudo, email, password, isVerify, isAdmin } = req.body;

    try{

        const user_insert = await db.query(`INSERT INTO user SET email= :email, pseudo= :pseudo, password= :password, confirmation_date= NOW();`, {email, pseudo, password: hash(password)});
        const user_avatar = await db.query(`INSERT INTO pictureBank SET num_user= '${user_insert.insertId}';`)
        const user_insert_role = await db.query(`INSERT INTO user_role SET num_user= '${user_insert.insertId}', isVerify= :isVerify, isAdmin= :isAdmin;`, {isVerify: !isVerify ? false: true, isAdmin: !isAdmin ? false : true});
        const user_insert_address = await db.query(`INSERT INTO user_address SET num_user= '${user_insert.insertId}';`);
        const user_insert_profil = await db.query(`INSERT INTO user_profil SET num_user= '${user_insert.insertId}';`);


    } catch (err) {
        throw err;
    }
    res.redirect('back');
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

    const { id } = req.params

    try {
        const selectUser = await db.query(`SELECT user.email, user.pseudo, user.password, pictureBank.link_picture, user_role.isVerify, user_role.isAdmin, user_role.isBan, user_address.name, user_address.first_name, user_address.address, user_address.postal_code, user_address.city, user_address.phone, user_profil.civility, user_profil.description
                                           FROM user
                                           INNER JOIN pictureBank ON pictureBank.link_picture LIKE '%user%' AND pictureBank.num_user = user.num_user
                                           INNER JOIN user_role ON user_role.num_user = user.num_user
                                           INNER JOIN user_address ON user_address.num_user = user.num_user
                                           INNER JOIN user_profil ON user_profil.num_user = user.num_user
                                           WHERE user.num_user = ${id};`)

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
        isVerify = !isVerify ? false : true;
        isAdmin = !isAdmin ? false : true;
        isBan = !isBan ? false : true;
        isArchiving = !isArchiving ? false : true;
        avatar = !req.file.path ? selectUser[0].link_picture : req.file.path;

        const user_update = await db.query(`UPDATE user SET pseudo= :pseudo, email= :email, password= :password  WHERE num_user = :id ;`, {id, pseudo, email, password});
        const user_avatar_update = await db.query(`UPDATE pictureBank SET link_picture= :avatar  WHERE num_user = :id ;`, {id, avatar});
        const user_address_update = await db.query(`UPDATE user_address SET name= :name, first_name= :first_name, address= :address, postal_code= :postal_code, city= :city, phone= :phone  WHERE num_user = :id ;`, {id, name, first_name, address, postal_code, city, phone});
        const user_profil_update = await db.query(`UPDATE user_profil SET civility= :civility, description= :description  WHERE num_user = :id ;`, {id, civility, description});
        const user_role_update = await db.query(`UPDATE user_role SET isVerify= :isVerify, isAdmin= :isAdmin, isBan= :isBan, isArchiving= :isArchiving WHERE num_user = :id ;`, {id, isVerify, isAdmin, isBan, isArchiving});

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

        const user_ban = await db.query(`UPDATE user_role SET isBan= true WHERE num_user = :id;`, {id});
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

        const user_archiving = await db.query(`UPDATE user_role SET isArchiving = true WHERE num_user = :id;`, {id});
        const session_kill = await db.query(`DELETE FROM sessions WHERE data LIKE '%"id":${id}%';`);

        res.redirect('back');
    } catch (err) {
        throw err;
    }
}

exports.unBanUser = async (req, res) => {
    const {
        id
    } = req.params;

    try {

        const user_deBan = await db.query(`UPDATE user_role SET isBan= false WHERE num_user = :id;`, {id});
        const session_kill = await db.query(`DELETE FROM sessions WHERE data LIKE '%"id":${id}%';`);

        res.redirect('back');
    } catch (err) {
        throw err;
    }
}

exports.unArchivingUser = async (req, res) => {
    const {
        id
    } = req.params;

    try {

        const user_deArchiving = await db.query(`UPDATE user_role SET isArchiving = false WHERE num_user = :id;`, {id});
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
        const user_delete = await db.query(`DELETE pictureBank, user 
                                              FROM user  
                                                RIGHT JOIN pictureBank 
                                                  ON pictureBank.link_picture LIKE '%user%' AND pictureBank.num_user = user.num_user 
                                              WHERE pictureBank.num_user = :id ;`, {id});

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
        category
    } = req.body;

    try {
        const blog = await db.query(`INSERT INTO blog 
                                       SET title= :title, description= :description, contents= :content, date= NOW(), num_user= '${req.session.user.id}';`, 
                                    {title, description, content});

        const picture = await db.query(`INSERT INTO pictureBank 
                                          SET link_picture= :path, num_user= '${req.session.user.id}', num_blog= '${blog.insertId}';`, {path: req.file.path});

        const category_blog = await db.query(`INSERT INTO category SET name= :category, num_blog= '${blog.insertId}', num_picture= '${picture.insertId}';`, {category})
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

        const blog = await db.query(`UPDATE blog 
                                       SET title= :title, description= :description, contents= :contents 
                                     WHERE num_blog = '${selectBlog[0].num_blog}';`, {title, description, contents});

        const picture = await db.query(`UPDATE pictureBank SET link_picture= :link WHERE num_blog = '${selectBlog[0].num_blog}';`, {link: req.file.path});
        const category_blog = await db.query(`UPDATE category SET name= :category WHERE num_blog = '${selectBlog[0].num_blog}';`, {category});
        
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
        
    } catch (err) {
        throw err;
    }
    res.redirect('back');
}

exports.resetPictureUser = async (req, res) => {
    const {
        id
    } = req.params;

    try {

        const resetPictureUser = await db.query(`UPDATE pictureBank SET link_picture = 'assets/images/avatar/1644325173801_user_avatar.jpg' WHERE link_picture LIKE '%user%' AND num_user = :id;`, {id});
        const session_kill = await db.query(`DELETE FROM sessions WHERE data LIKE '%"id":${id}%';`);

        res.redirect('back');
    } catch (err) {
        throw err;
    }
}

exports.resetPictureBlog = async (req, res) => {
    const {
        id
    } = req.params;

    try {

        const resetPictureBlog = await db.query(`UPDATE pictureBank SET link_picture = 'assets/images/avatar/1644325173801_user_avatar.jpg' WHERE link_picture LIKE '%blog%' AND num_blog = :id;`, {id});

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
        category
    } = req.body;

    const { id } = req.params;

    try {
        const selectGallery = await db.query(`SELECT pictureBank.link_picture, pictureBank.title_picture, pictureBank.description_picture, user.pseudo, category.name
                                        FROM pictureBank
                                        INNER JOIN user ON user.num_user = pictureBank.num_user
                                        INNER JOIN blog ON blog.num_blog = pictureBank.num_blog
                                        INNER JOIN category ON category.num_picture = pictureBank.num_picture
                                        WHERE num_picture= ${id}`);;

        link_picture = !link_picture ? selectGallery[0].link_picture : link_picture;
        title_picture = !title_picture ? selectGallery[0].title_picture : title_picture;
        description_picture = !description_picture ? selectGallery[0].description_picture : description_picture;
        category = !category ? selectGallery[0].name : category;
        
        
        const picture = await db.query(`UPDATE pictureBank SET link_picture= :link, title_picture= :title_picture, description_picture= :description_picture WHERE num_picture= :id;`, {id, link: req.file.path, title_picture, description_picture});
        const category_picture = await db.query(`UPDATE category SET name= :category WHERE num_picture= :id;`, {id, category});
        
    } catch (err) {
        throw err;
    }
    res.redirect('back');
}

exports.deleteGallery = async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const picture_category = await db.query(`DELETE category,pictureBank FROM category left join pictureBank ON category.num_picture = pictureBank.num_picture WHERE category.num_picture= '${id}';`);
        
    } catch (err) {
        throw err;
    }
    res.redirect('back');
}