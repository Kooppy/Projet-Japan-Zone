/*
 * Test Unitaire: Mocha (User)
 * ************************ */

const assert = require('assert'), 
      { selectID } = require('../../../back/util/select'), 
      //hash = require('../../back/util/hash.js'),
      crypto = require('crypto'),
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
        let hash = crypto.createHash('sha256');
        hash.update(password);

        let pass = hash.digest('hex');

        const user_insert = await db.query(`INSERT INTO user SET email= :email, pseudo= :pseudo, password= :password;`, {email, pseudo, password: pass});
        const user_avatar = await db.query(`INSERT INTO pictureBank SET num_user= '${user_insert.insertId}';`)
        const user_insert_role = await db.query(`INSERT INTO user_role SET num_user= '${user_insert.insertId}';`);
        const user_insert_address = await db.query(`INSERT INTO user_address SET num_user= '${user_insert.insertId}';`);
        const user_insert_profil = await db.query(`INSERT INTO user_profil SET num_user= '${user_insert.insertId}';`);

        assert.ok(user_insert.insertId);
        assert.ok(user_avatar.insertId);
        assert.ok(user_insert_role);
        assert.ok(user_insert_address);
        assert.ok(user_insert_profil);

        const userID = await selectID('num_user, email, pseudo, password', 'user', 'num_user= :value', user_insert.insertId);    

        user = { ...userID};

        assert.strictEqual(userID.email, email);
        assert.strictEqual(userID.pseudo, pseudo);
        assert.strictEqual(userID.password, pass);
    });


    // Insert User
    it('POST // Customer', async ()=>{
        rand = Math.floor(Math.random() * 100000);
        const {email, pseudo, password} = {
            email: `${rand}@hotmail.fr`,
            pseudo: `${rand}`,
            password: `${rand}`
        }
        let hash = crypto.createHash('sha256');
        hash.update(password);

        let pass = hash.digest('hex');

        const user_insert = await db.query(`INSERT INTO user SET email= :email, pseudo= :pseudo, password= :password;`, {email, pseudo, password: pass});
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
        assert.strictEqual(userID.password, pass);
    });

    // Get ALL User
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
        const user_connect = await db.query(`SELECT user.num_user, user.email, user.pseudo, pictureBank.link_picture, user_role.isVerify, user_role.isAdmin, user_role.isBan 
                                             FROM user 
                                               INNER JOIN pictureBank ON pictureBank.num_user = user.num_user 
                                               INNER JOIN user_role ON user_role.num_user = user.num_user 
                                             WHERE (pseudo= :pseudo OR email= :pseudo);`, {pseudo: user.pseudo});

        assert.ok(user_connect)
        assert.strictEqual(user_connect.length === 1, true)
    });

    // PUT Id User For Verify Per User Or Per Admin 
    it('PUT ID VERIFY // User', async () => {
        const user_verify = await db.query(`UPDATE user_role SET isVerify= true WHERE num_user = :id ;`, {id: user.num_user});

        const userID = await db.query(`SELECT isVerify FROM user_role WHERE num_user= :id`, {id: user.num_user});
        
        assert.ok(userID)
        assert.strictEqual(userID[0].isVerify, 1);
        assert.strictEqual(session.length, 0);
    });

    // PUT Id User For Ban Per Admin
    it('PUT ID BAN // User', async () => {
        const user_ban = await db.query(`UPDATE user_role SET isBan= true WHERE num_user = :id ;`, {id: user.num_user});
        const session_kill = await db.query(`DELETE FROM sessions WHERE data LIKE '%"id":${user.num_user}%';`);

        const userID = await db.query(`SELECT isBan FROM user_role WHERE num_user= :id`, {id: user.num_user});
        
        const session = await  db.query(`SELECT data FROM sessions WHERE data LIKE '%"id":${user.num_user}%';`);
        assert.ok(userID)
        assert.strictEqual(userID[0].isBan, 1);
        assert.strictEqual(session.length, 0);
    });

    // PUT Id User For Archiving Per Admin Or Per User
    it('PUT ID ARCHIVING // User', async () => {
        const user_archiving = await db.query(`UPDATE user_role SET isArchiving= true WHERE num_user = :id ;`, {id: user.num_user});
        
        // Delete Session Manually When Administrator Archives User
        const session_kill = await db.query(`DELETE FROM sessions WHERE data LIKE '%"id":${user.num_user}%';`);

        const userID = await db.query(`SELECT isArchiving FROM user_role WHERE num_user= :id`, {id: user.num_user});
        
        const session = await  db.query(`SELECT data FROM sessions WHERE data LIKE '%"id":${user.num_user}%';`);
        assert.ok(userID)
        assert.strictEqual(userID[0].isArchiving, 1);
        assert.strictEqual(session.length, 0);
    });

    // DELETE Id User (oublie pas la cascade)
    it('DELETE ID // User', async () => {
        const user_delete = await db.query(`DELETE FROM user WHERE num_user = :id ;`, {id: user.num_user});
        
        const session_kill = await db.query(`DELETE FROM sessions WHERE data LIKE '%"id":${user.num_user}%';`);

        const userID = await db.query(`SELECT count(*) as num FROM user WHERE num_user= :id`, {id: user.num_user});
        
        const session = await  db.query(`SELECT data FROM sessions WHERE data LIKE '%"id":${user.num_user}%';`);
        assert.ok(userID)
        assert.strictEqual(userID[0].num, 0);
        assert.strictEqual(session.length, 0);
    });

    // DELETE ALL User (oublie pas la cascade)
    it('DELETE ID // User', async () => {
        const user_delete = await db.query(`DELETE FROM user;`);
        
        const session_kill = await db.query(`DELETE FROM sessions;`);

        const userID = await db.query(`SELECT count(*) as num FROM user WHERE num_user= :id`, {id: user.num_user});
        
        const session = await  db.query(`SELECT data FROM sessions WHERE data LIKE '%"id":${user.num_user}%';`);
        assert.ok(userID)
        assert.strictEqual(userID[0].num, 1);
        assert.strictEqual(session.length, 0);
    });

});