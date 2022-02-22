/*
 * Test Unitaire: Chai (Route)
 * ************************ */
const chai = require("chai"),
      chaiHttp = require("chai-http"), 
      should = require("chai").should(),
      expect = chai.expect,
      connectDB = require ('../../../back/config/database'),
      { app } = require("../../../index"),
      path = require("path");

chai.use(chaiHttp);

describe('CHAI // CONTROLLER // BLOG', async () => {

    // Test Route Blog
    it(" ChaiRouter // POST // Blog", (done) => {
        chai
            .request(app)
            .post("/api/admin/blog")
            .set("Accept", "application/json")
            .field("Content-Type", "multipart/form-data")
            .field("desc", "smod")
            .attach("avatar", path.resolve(__dirname, "./1644325173801_user_avatar.jpg"))
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                done();
            });
    });






});