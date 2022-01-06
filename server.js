/*
 * Server.js
 * Point d'entré de l'application (Main / Root)
 * ******************************************** */

// Config .env
require('dotenv').config();

// Import de module
const express = require('express'),
  app = express(),
  port = process.env.PORT || 3003,
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  mysql = require('mysql'),
  crypto = require('crypto'),
  ROUTER = require('./back/router.js'),
  expressSession = require('express-session'),
  MySQLStore = require("express-mysql-session")(expressSession)
  handlebars = require('express-handlebars');

// Method-Override
app.use(methodOverride('_method'));

/* ******** */

/*let hash = crypto.createHash('sha256');
hash.update('test')
console.log("Ma clé crypt :", `${hash}`);
console.log("Ma clé crypt :", `${hash.digest('hex')}`);*/


let password = '123456789'
//let key = crypto.scryptSync(password, 'tuto', 24);
let key = crypto.randomBytes(32);
console.log("ouiouioui",key);
let iv = crypto.randomBytes(16);

console.log("ouiouioui", iv);
let cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
let crypted = cipher.update('bonjour', 'utf8', 'hex')
crypted += cipher.final('hex')
console.log("encrypt :", crypted);

let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
let dec = decipher.update(crypted, 'hex', 'utf8')
dec += decipher.final('utf8')
console.log("decrypt :", dec);

/* ******** */


// Config Database
let config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
}

// Create Connection //
db = mysql.createConnection(config);

// Connect Database
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
})

// Body-Parser, parser mes data d'une req
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Config Handlebars et Définis le moteur de mon app
app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({
  extname: 'hbs',
  defaultLayout: 'main',
}));

/* 
 * Permet de le diriger vers le dossier assets à fin 
 * d'utiliser le css/js/images 
*/
app.use('/assets', express.static('assets'));

// Gestion de la session
app.use(expressSession({
  secret: 'keyboard cat',
  name: 'sessionID',
  saveUninitialized: true,
  resave: false,
  store: new MySQLStore(config)
}));

// Session Connexion for use HBS
app.use('*', (req, res, next) => {
  res.locals.user = req.session.user;
  console.log("Session côter server.js :", req.session);
  next();
})

// Router.js
app.use('/', ROUTER);

/*app.get('/', function(req, res, next) {
    if (req.session.views) {
      req.session.views++
      console.log(req.sessionID);
      res.setHeader('Content-Type', 'text/html')
      res.write('<p>views: ' + req.sessionID+ '</p>')
      res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
      res.end()
    } else {
      req.session.views = true
      res.end('welcome to the session demo. refresh!')
      console.log(req.session); 
    }
  })*/

// Lancement de l'application
app.listen(port, function () {
  console.log('App disponible sur localhost:3000 !');
});