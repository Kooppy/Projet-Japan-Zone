const mysql = require('mysql'),
    dbOption = require('./dbOption');

// Create Connection //
db = mysql.createConnection({
    ...dbOption
});
/*const util = require("util");
db.query = util.promisify(db.query).bind(db);*/

// Export Module Connect Database
exports.connect = () => {
    db.connect((err) => {
        if (err) console.error('error connect:' + err.stack);
        db.query("SHOW TABLES", function (err, result) {
            if (err) console.error('error connect:' + err.stack);
            console.log(result);
        });
        db.query("SELECT * FROM user", function (err, result) {
            if (err) console.error('error connect:' + err.stack);
            console.log(result);
        });
        db.query("SELECT * FROM sessions", function (err, result) {
            if (err) console.error('error connect:' + err.stack);
            console.log(result);
        });
        console.log('connected' + db.threadId);
    });
}