/*
 * Test Unitaire: Chai (Route)
 * ************************ */
const chai = require("chai"),
    chaiHttp = require("chai-http"),
    should = require("chai").should(),
    expect = chai.expect,
    { app } = require("../../../"),
    { hash } = require('../../../back/util/hash'),
    { selectID } = require("../../../back/util/select"),
    path = require("path");

chai.use(chaiHttp);

describe('CHAI // CONTROLLER // BLOG', async () => {
    let rand;
    let user;

    before(async () => {
        rand = Math.floor(Math.random() * 10000000);
        const {
            email,
            pseudo,
            password
        } = {
            email: `${rand}@hotmail.fr`,
            pseudo: `${rand}`,
            password: `${rand}`
        }

        const user_insert = await db.query(`INSERT INTO user SET email= :email, pseudo= :pseudo, password= :password;`, {
            email,
            pseudo,
            password: hash(password)
        });
        const user_avatar = await db.query(`INSERT INTO pictureBank SET num_user= '${user_insert.insertId}';`)
        const user_insert_role = await db.query(`INSERT INTO user_role SET num_user= '${user_insert.insertId}';`);
        const user_insert_address = await db.query(`INSERT INTO user_address SET num_user= '${user_insert.insertId}';`);
        const user_insert_profil = await db.query(`INSERT INTO user_profil SET num_user= '${user_insert.insertId}';`);

        const selectUser = await db.query(`SELECT user.num_user, user.email, user.pseudo, user.password, pictureBank.link_picture, user_address.name, user_address.first_name, user_address.address, user_address.postal_code, user_address.city, user_address.phone, user_profil.civility, user_profil.description
                                            FROM user 
                                              INNER JOIN pictureBank 
                                                ON pictureBank.num_user = user.num_user 
                                              INNER JOIN user_address 
                                                ON user_address.num_user = user.num_user 
                                              INNER JOIN user_profil 
                                                ON user_profil.num_user = user.num_user 
                                            WHERE user.num_user= ${user_insert.insertId};`);

        user = {
            ...selectUser[0]
        };
    });

    //Test Route Post Blog
    it("ChaiRouter // POST // Blog", (done) => {
        rand = Math.floor(Math.random() * 100000);
        chai
            .request(app)
            .post("/api/admin/blog")
            .set("Accept", "application/json")
            .field("Content-Type", "multipart/form-data")
            .field('title', `${rand}`)
            .field('description', `${rand}`)
            .field('content', `${rand}`)
            .field('category', `${rand}`)
            .field('id', 2)
            .attach("picBlog", path.resolve(__dirname, "./th.jpeg"))
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.selectBlogId.should.be.a("array");
                res.body.selectBlogId[0].should.be.a("object");
                done();
            });
    });

    // Test route get /blog
    it("ChaiRouter // GET // Blog", (done) => {
        chai
            .request(app)
            .get("/api/blog")
            .set("Accept", "application/json")
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.blog.should.be.a("array");
                res.body.blog[0].should.be.a("object");
                done();
            });
    });

    // Test route get /blog/:id
    it("ChaiRouter // GET // BlogID", (done) => {
        chai
            .request(app)
            .get(`/api/blog/${rand}`)
            .set("Accept", "application/json")
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.blog.should.be.a("object");
                done();
            });
    });

    // Test route PUT /admin/blog/:id
    it("ChaiRouter // PUT // BlogID", async () => {
        const blog = await selectID('num_blog', 'blog', 'title= :value', rand);
        id= blog.num_blog;

        rand = Math.floor(Math.random() * 100000000);
        chai
            .request(app)
            .put(`/api/admin/blog/${id}`)
            .set("Accept", "application/json")
            .field("Content-Type", "multipart/form-data")
            .field('title', `${rand}`)
            .field('description', `${rand}`)
            .field('contents', `${rand}`)
            .field('category', `${rand}`)
            .attach("picBlog", path.resolve(__dirname, "./Kooppy.png"))
            .end((err, res) => {
                if (err) return err;
                res.should.have.status(200);
                res.body.selectBlogId.should.be.a("array");
                res.body.selectBlogId[0].should.be.a("object");
            });
    });

    // Test route DELETE /admin/blog/:id
    it("ChaiRouter // DELETE // BlogID", (done) => {
        chai
            .request(app)
            .delete(`/api/admin/blog/${id}`)
            .set("Accept", "application/json")
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.blog.should.be.a("array");
                res.body.blog[0].should.be.a("object");
                done();
            });
    });
});