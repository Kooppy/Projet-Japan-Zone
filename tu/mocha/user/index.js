/*
 * Test Unitaire: Mocha (User)
 * ************************ */

const assert = require('assert'), 
      { selectID } = require('../../../back/util/select'),
      { hash } = require('../../../back/util/hash'),
      connectDB = require ('../../../back/config/database');

describe('MOCHA // CRUD // USER', () =>{

    connectDB.connect();
    let user;
    let rand;

    beforeEach(async () => {
        rand = Math.floor(Math.random() * 10000000);
        const {email, pseudo, password} = {
            email: `${rand}@hotmail.fr`,
            pseudo: `${rand}`,
            password: `${rand}`
        }

        const user_insert = await db.query(`INSERT INTO user SET email= :email, pseudo= :pseudo, password= :password;`, {email, pseudo, password: hash(password)});
        const user_avatar = await db.query(`INSERT INTO pictureBank SET num_user= '${user_insert.insertId}';`)
        const user_insert_role = await db.query(`INSERT INTO user_role SET num_user= '${user_insert.insertId}';`);
        const user_insert_address = await db.query(`INSERT INTO user_address SET num_user= '${user_insert.insertId}';`);
        const user_insert_profil = await db.query(`INSERT INTO user_profil SET num_user= '${user_insert.insertId}';`);

        assert.ok(user_insert.insertId);
        assert.ok(user_avatar.insertId);
        assert.ok(user_insert_role);
        assert.ok(user_insert_address);
        assert.ok(user_insert_profil);

        const selectUser = await db.query(`SELECT user.num_user, user.email, user.pseudo, user.password, pictureBank.link_picture, user_address.name, user_address.first_name, user_address.address, user_address.postal_code, user_address.city, user_address.phone, user_profil.civility, user_profil.description
                                            FROM user 
                                              INNER JOIN pictureBank 
                                                ON pictureBank.num_user = user.num_user 
                                              INNER JOIN user_address 
                                                ON user_address.num_user = user.num_user 
                                              INNER JOIN user_profil 
                                                ON user_profil.num_user = user.num_user 
                                            WHERE user.num_user= ${user_insert.insertId};`);

        user = { ...selectUser[0]};

        assert.strictEqual(user.email, email);
        assert.strictEqual(user.pseudo, pseudo);
        assert.strictEqual(user.password, hash(password));
    });


    // Insert User
    it('POST // Customer', async ()=>{
        rand = Math.floor(Math.random() * 100000);
        const {email, pseudo, password} = {
            email: `${rand}@hotmail.fr`,
            pseudo: `${rand}`,
            password: `${rand}`
        }

        const user_insert = await db.query(`INSERT INTO user SET email= :email, pseudo= :pseudo, password= :password;`, {email, pseudo, password: hash(password)});
        const user_avatar = await db.query(`INSERT INTO pictureBank SET num_user= '${user_insert.insertId}';`)
        const user_insert_role = await db.query(`INSERT INTO user_role SET num_user= '${user_insert.insertId}';`);
        const user_insert_address = await db.query(`INSERT INTO user_address SET num_user= '${user_insert.insertId}';`);
        const user_insert_profil = await db.query(`INSERT INTO user_profil SET num_user= '${user_insert.insertId}';`);

        assert.ok(user_insert.insertId);
        assert.ok(user_avatar.insertId);
        assert.ok(user_insert_role);
        assert.ok(user_insert_address);
        assert.ok(user_insert_profil);

        const userID = await selectID('email, pseudo, password', 'user', 'num_user= :value', user_insert.insertId);    
        
        assert.strictEqual(userID.email, email);
        assert.strictEqual(userID.pseudo, pseudo);
        assert.strictEqual(userID.password, hash(password));
    });

    // Get ALL User For Admin
    it('GET ALL // User', async () => {
        const users = await db.query(`SELECT user.num_user, user.email, user.pseudo, user.password, user.confirmation_date, pictureBank.link_picture, user_role.isVerify, user_role.isAdmin, user_role.isBan, user_address.name, user_address.first_name, user_address.address, user_address.postal_code, user_address.city, user_address.phone, user_profil.civility, user_profil.description
                                      FROM user
                                        INNER JOIN pictureBank ON pictureBank.link_picture LIKE '%user%' AND pictureBank.num_user = user.num_user
                                        INNER JOIN user_role ON user_role.num_user = user.num_user
                                        INNER JOIN user_address ON user_address.num_user = user.num_user
                                        INNER JOIN user_profil ON user_profil.num_user = user.num_user
                                      ORDER BY user.num_user DESC;`);

        assert.ok(users)
        assert.strictEqual(users.length > 0, true)
    });

    // Get Id User For Connect
    it('GET ID CONNECT // User', async () => {
        const user_connect = await db.query(`SELECT user.num_user, user.email, user.pseudo, pictureBank.link_picture, user_role.isVerify, user_role.isAdmin 
                                             FROM user 
                                               INNER JOIN pictureBank ON pictureBank.num_user = user.num_user 
                                               INNER JOIN user_role ON user_role.num_user = user.num_user 
                                             WHERE (pseudo= :pseudo OR email= :pseudo);`, {pseudo: user.pseudo});

        assert.ok(user_connect)
        assert.strictEqual(user_connect.length === 1, true)
    });

    // Get Id User For Profil
    it('GET ID PROFIL // User', async () => {
        const user_profil = await db.query(`SELECT user.num_user, user.email, user.pseudo, user.confirmation_date, pictureBank.link_picture, user_address.name, user_address.first_name, user_address.address, user_address.postal_code, user_address.city, user_address.phone, user_profil.civility, user_profil.description
                                             FROM user 
                                               INNER JOIN pictureBank ON pictureBank.num_user = user.num_user 
                                               INNER JOIN user_address ON user_address.num_user = user.num_user 
                                               INNER JOIN user_profil ON user_profil.num_user = user.num_user 
                                             WHERE user.pseudo= :pseudo;`, {pseudo: user.pseudo});

        assert.ok(user_profil)
        assert.strictEqual(user_profil.length === 1, true)
    });

    // PUT Id User For Profil Per User Or Per Admin 
    it('PUT ID PROFIL // User', async () => {
        rand = Math.floor(Math.random() * 1000);
        let {
            pseudo,
            email,
            avatar,
            name,
            first_name,
            address,
            postal_code,
            city,
            phone,
            civility,
            description,
            password
        } = {
            pseudo: '',
            email: `${rand}@outlook.fr`,
            avatar: '',
            name: `jack$${rand}`,
            first_name: `${rand}`,
            address: `${rand}`,
            postal_code: `${rand}`,
            city: `${rand}`,
            phone: `${rand}`,
            civility: `M`,
            description: `${rand}`,
            password: `${rand}`
        };

        pseudo = !pseudo ? user.pseudo : pseudo;
        email = !email ? user.email : email;
        avatar = !avatar ? user.link_picture : avatar;
        name = !name ? user.name : name;
        first_name = !first_name ? user.first_name : first_name;
        address = !address ? user.address : address;
        postal_code = !postal_code ? user.postal_code : postal_code;
        city = !city ? user.city : city;
        phone = !phone ? user.phone : phone;
        civility = !civility ? user.civility : civility;
        description = !description ? user.description : description;
        password = !password ? user.password : hash(password);

        const user_update = await db.query(`UPDATE user SET pseudo= :pseudo, email= :email, password= :password  WHERE num_user = :id ;`, {id: user.num_user, pseudo, email, password});
        const user_avatar_update = await db.query(`UPDATE pictureBank SET link_picture= :avatar  WHERE num_user = :id ;`, {id: user.num_user, avatar});
        const user_address_update = await db.query(`UPDATE user_address SET name= :name, first_name= :first_name, address= :address, postal_code= :postal_code, city= :city, phone= :phone  WHERE num_user = :id ;`, {id: user.num_user, name, first_name, address, postal_code, city, phone});
        const user_profil_update = await db.query(`UPDATE user_profil SET civility= :civility, description= :description  WHERE num_user = :id ;`, {id: user.num_user, civility, description});

        assert.ok(user_update)
        assert.ok(user_avatar_update)
        assert.ok(user_address_update)
        assert.ok(user_profil_update)
        
        const userID = await db.query(`SELECT user.num_user, user.email, user.pseudo, user.password, pictureBank.link_picture, user_address.name, user_address.first_name, user_address.address, user_address.postal_code, user_address.city, user_address.phone, user_profil.civility, user_profil.description
                                       FROM user
                                          INNER JOIN pictureBank 
                                            ON pictureBank.link_picture LIKE '%user%' AND pictureBank.num_user = user.num_user
                                          INNER JOIN user_role 
                                            ON user_role.num_user = user.num_user
                                          INNER JOIN user_address 
                                            ON user_address.num_user = user.num_user
                                          INNER JOIN user_profil 
                                            ON user_profil.num_user = user.num_user
                                       WHERE user.num_user= :id;` , {id: user.num_user});

        assert.ok(userID)

        assert.strictEqual(userID[0].pseudo, pseudo);
        assert.strictEqual(userID[0].email, email);
        assert.strictEqual(userID[0].link_picture, avatar);
        assert.strictEqual(userID[0].name, name);
        assert.strictEqual(userID[0].first_name, first_name);
        assert.strictEqual(userID[0].address, address);
        assert.strictEqual(userID[0].postal_code, postal_code);
        assert.strictEqual(userID[0].city, city);
        assert.strictEqual(userID[0].phone, phone);
        assert.strictEqual(userID[0].civility, civility);
        assert.strictEqual(userID[0].description, description);
        assert.strictEqual(userID[0].password, password);
    });

    // Insert Blog Per Admin
    it('INSERT BLOG // User-Admin', async () => {
        rand = Math.floor(Math.random() * 1000);
        const {
            title,
            description,
            content,
            picture, 
            category
        } = { 
            title: `lili`,
            description: `${rand}`,
            content: `${rand}`,
            picture: `69846_blog_${rand}`,
            category: `${rand}`
        };

        const blog = await db.query(`INSERT INTO blog SET title= :title, description= :description, contents= :content, date= NOW(), num_user= '${user.num_user}';`, {title, description, content});
        const picture_blog = await db.query(`INSERT INTO pictureBank SET link_picture= :picture, num_user= '${user.num_user}', num_blog= '${blog.insertId}';`, {picture});
        const category_blog = await db.query(`INSERT INTO category SET name= :category, num_blog= '${blog.insertId}', num_picture= '${picture_blog.insertId}';`, {category});
        
        assert.ok(blog)
        assert.ok(picture_blog)
        assert.ok(category_blog)

        const selectBlog = await db.query(`SELECT blog.title, blog.description, blog.contents, pictureBank.link_picture, category.name
                                           FROM blog 
                                             INNER JOIN pictureBank 
                                               ON pictureBank.link_picture LIKE '%blog%' AND pictureBank.num_blog = blog.num_blog
                                             INNER JOIN category 
                                               ON category.num_blog = blog.num_blog
                                           WHERE blog.num_user= ${user.num_user};`);

        assert.strictEqual(selectBlog[0].title, title);
        assert.strictEqual(selectBlog[0].description, description);
        assert.strictEqual(selectBlog[0].contents, content);
        assert.strictEqual(selectBlog[0].link_picture, picture);
        assert.strictEqual(selectBlog[0].name, category);
    });

    // PUT Id User For Verify Per User Or Per Admin 
    it('PUT ID VERIFY // User', async () => {
        
        const user_verify = await db.query(`UPDATE user_role SET isVerify= true WHERE num_user = :id ;`, {id: user.num_user});

        const userID = await db.query(`SELECT isVerify FROM user_role WHERE num_user= :id`, {id: user.num_user});

        assert.ok(userID)
        assert.strictEqual(userID[0].isVerify, 1);
    });

    // Insert Comment Per User
    it('INSERT COMMENT // User', async () => {
        const { message, title } = {
            message : `${rand}`,
            title : 'lili'
        }

        const blogId = await selectID('num_blog', 'blog', 'title= :value', title);
        const comment = await db.query(`INSERT INTO comment SET contents= :message, date= NOW(), num_user= '${user.num_user}', num_blog= '${blogId.num_blog}';`, {message})
       
        assert.ok(comment)

        const commentId = await selectID('contents, num_blog, num_user', 'comment', 'num_comment= :value', comment.insertId);

        assert.strictEqual(commentId.contents, message);
        assert.strictEqual(commentId.num_blog, blogId.num_blog);
        assert.strictEqual(commentId.num_user, user.num_user);
    });

    // Delete Comment Per User Or Admin
    it('DELETE COMMENT // User', async () => {
        const commentId = await selectID('num_comment', 'comment', 'num_user= :value', user.num_user-1);

        const delComment = await db.query(`DELETE FROM comment WHERE num_comment=${commentId.num_comment};`);
       
        assert.ok(delComment)

        const comment = await selectID('count(*) as num', 'comment', 'num_comment= :value', commentId.num_comment);
        
        assert.ok(comment)
        assert.strictEqual(comment.num, 0);
    });

    // PUT Id User For Ban Per Admin
    it('PUT ID BAN // User', async () => {
        const user_ban = await db.query(`UPDATE user_role SET isBan= true WHERE num_user = :id ;`, {id: user.num_user});
        const session_kill = await db.query(`DELETE FROM sessions WHERE data LIKE '%"id":${user.num_user}%';`);

        assert.ok(user_ban)
        assert.ok(session_kill)

        const userID = await db.query(`SELECT isBan FROM user_role WHERE num_user= :id`, {id: user.num_user});
        
        const session = await  db.query(`SELECT data FROM sessions WHERE data LIKE '%"id":${user.num_user}%';`);
        
        assert.ok(userID)
        assert.ok(session)
        
        assert.strictEqual(userID[0].isBan, 1);
        assert.strictEqual(session.length, 0);
    });

    // PUT Id User For Archiving Per Admin Or Per User
    it('PUT ID ARCHIVING // User', async () => {
        const user_archiving = await db.query(`UPDATE user_role SET isArchiving= true WHERE num_user = :id ;`, {id: user.num_user});
        
        // Delete Session Manually When Administrator Archives User
        const session_kill = await db.query(`DELETE FROM sessions WHERE data LIKE '%"id":${user.num_user}%';`);

        assert.ok(user_archiving)
        assert.ok(session_kill)

        const userID = await db.query(`SELECT isArchiving FROM user_role WHERE num_user= :id`, {id: user.num_user});
        
        const session = await  db.query(`SELECT data FROM sessions WHERE data LIKE '%"id":${user.num_user}%';`);
        
        assert.ok(userID)
        assert.ok(session)

        assert.strictEqual(userID[0].isArchiving, 1);
        assert.strictEqual(session.length, 0);
    });

    // DELETE Id User
    it('DELETE ID // User', async () => {
        const user_delete = await db.query(`DELETE pictureBank, user 
                                            FROM user  
                                              RIGHT JOIN pictureBank 
                                                ON pictureBank.link_picture LIKE '%user%' AND pictureBank.num_user = user.num_user 
                                            WHERE user.num_user = :id ;`, {id: user.num_user});
        
        const session_kill = await db.query(`DELETE FROM sessions WHERE data LIKE '%"id":${user.num_user}%';`);

        assert.ok(user_delete)
        assert.ok(session_kill)

        const userID = await db.query(`SELECT count(*) as num FROM user WHERE num_user= :id`, {id: user.num_user});
        
        const session = await  db.query(`SELECT data FROM sessions WHERE data LIKE '%"id":${user.num_user}%';`);
        
        assert.ok(userID)
        assert.ok(session)

        assert.strictEqual(userID[0].num, 0);
        assert.strictEqual(session.length, 0);
    });

    // DELETE ALL User Methode Cascade for User_role / address / profil and comment
    it('DELETE ALL // User', async () => {
        const user_delete = await db.query(`DELETE pictureBank, user 
                                            FROM user 
                                             RIGHT JOIN pictureBank 
                                               ON pictureBank.num_user = user.num_user;`);
        
        const session_kill = await db.query(`DELETE FROM sessions;`);

        assert.ok(user_delete)
        assert.ok(session_kill)

        const userID = await db.query(`SELECT count(*) as num FROM user`);
        
        const session = await  db.query(`SELECT data FROM sessions WHERE data LIKE '%"id":${user.num_user}%';`);
        
        assert.ok(userID)
        assert.ok(userID)

        assert.strictEqual(userID[0].num, 0);
        assert.strictEqual(session.length, 0); 
    });
});