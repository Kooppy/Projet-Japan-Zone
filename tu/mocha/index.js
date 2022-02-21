/*
 * Test Unitaire: Mocha (Admin)
 * ************************ */

const assert = require('assert'), 
      { selectID } = require('../../back/util/select'), 
      //hash = require('../../back/util/hash.js'),
      crypto = require('crypto'),
      connectDB = require ('../../back/config/database');

describe('MOCHA // CRUD // USER', () =>{

    connectDB.connect();

    beforeEach(async () => {
        const {email, pseudo, password} = {
            email: 'testestestestssssssss@hotmail.fr',
            pseudo: 'test1000000000000000',
            password: 'ouilepasswordsssssssssss'
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

        const userID = await selectID('email, pseudo, password', 'user', 'num_user= :value', user_insert.insertId);    
        
        assert.strictEqual(userID.email, email);
        assert.strictEqual(userID.pseudo, pseudo);
        assert.strictEqual(userID.password, pass);
    });



    it('POST // Customer', async ()=>{
        const {email, pseudo, password} = {
            email: 'ouiouuuuuui@hotmail.fr',
            pseudo: 'testyttttt100000',
            password: 'ouilepassssssswordestgenial'
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

        const userID = await selectID('email, pseudo, password', 'user', 'num_user= :value', user_insert.insertId);    
        
        assert.strictEqual(userID.email, email);
        assert.strictEqual(userID.pseudo, pseudo);
        assert.strictEqual(userID.password, pass);
    });
});