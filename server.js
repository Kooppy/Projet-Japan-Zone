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
  ROUTER = require('./back/router.js'),
  expressSession = require('express-session')
  handlebars = require('express-handlebars');

// Method-Override
app.use(methodOverride('_method'));

// Config Database
db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rfn2K22$',
  database: 'db_local_test'
})

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
  resave: false
}))

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