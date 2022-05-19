/*
 * Model: Auth (Auth)
 * ************************ */

const { hash } = require('../../util/hash'), 
      { selectID } = require('../../util/select');

class AuthModel {
    constructor(auth){
        this.email = auth.email; 
        this.pseudo = auth.pseudo; 
        this.password = auth.password;
    }

    postLogin() {
        const { pseudo, password } = this;
        return new Promise( async(resolve, rejected) => {
            try {
                const user_connect = await db.query(`
                    SELECT user.num_user, user.email, user.pseudo, pictureBank.link_picture, user_role.isVerify, user_role.isAdmin
                    FROM user 
                        INNER JOIN pictureBank 
                            ON pictureBank.num_user = user.num_user 
                        INNER JOIN user_role 
                            ON user_role.num_user = user.num_user 
                    WHERE (pseudo= :pseudo OR email= :pseudo) AND password= :password;`, {pseudo, password: hash(password)});

                const session_kill = await db.query(`DELETE FROM sessions WHERE data LIKE '%"id":${user_connect[0].num_user}%';`);

                resolve(user_connect[0]);
                
            } catch (err) {
                rejected(err);
            }
        })
    }

    postRegister() {
        const { email, pseudo, password } = this;
        return new Promise( async(resolve, rejected) => {
            try {

                const user_insert = await db.query(
                    `INSERT INTO user SET email= :email, pseudo= :pseudo, password= :password, confirmation_date= NOW();`, 
                    {email, pseudo, password: hash(password)}
                    );
                const user_avatar = await db.query(`INSERT INTO pictureBank SET num_user= '${user_insert.insertId}';`)
                const user_insert_role = await db.query(`INSERT INTO user_role SET num_user= '${user_insert.insertId}';`);
                const user_insert_address = await db.query(`INSERT INTO user_address SET num_user= '${user_insert.insertId}';`);
                const user_insert_profil = await db.query(`INSERT INTO user_profil SET num_user= '${user_insert.insertId}';`);

                resolve(user_insert.insertId)
                
            } catch (err) {
                rejected(err);
            }

        })
    }

    postForgot() {
        const { email } = this;
        return new Promise( async(resolve, rejected) => {
            try {
                
                const user = await selectID('num_user', 'user', 'email= :value', email);

                resolve(user);
            } catch (err) {
                rejected(err);
            }
        })
    }
}

module.exports = AuthModel;