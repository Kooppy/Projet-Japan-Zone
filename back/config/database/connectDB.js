const mysql = require('mysql'),
    dbOption = require('./dbOption');

// Create Connection //
db = mysql.createConnection({
    ...dbOption
});
const util = require("util");

// config custom query escapement 
db.config.queryFormat = function (query, values) {
    if (!values) return query;
    return query.replace(/\:(\w+)/g, function (txt, key) {
        if (values.hasOwnProperty(key)) {
            return this.escape(values[key]);
        }
        return txt;
    }.bind(this));
};

db.query = util.promisify(db.query).bind(db);

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