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
  dbOption = require('./back/config/database/dbOption'),
  connectDB = require ('./back/config/database/connectDB')
  crypto = require('crypto'),
  ROUTER = require('./back/router.js'),
  expressSession = require('express-session'),
  MySQLStore = require("express-mysql-session")(expressSession),
  handlebars = require('express-handlebars'),
  Handlebars = require('handlebars');

// Method-Override
app.use(methodOverride('_method'));

// Connexion DB
connectDB.connect();

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
  admin: 'adminLayout'
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
  store: new MySQLStore(dbOption)
}));

Handlebars.registerHelper('ifpaginate', function (a, b, opts) {
  if (a == b) {
    return opts.fn(this);
  } else {
    return opts.inverse(this);
  }
});

// Session Connexion for use HBS
app.use('*', (req, res, next) => {
  res.locals.user = req.session.user;
  console.log("Session côter server.js :", req.session);
  next();
})



// Router.js
app.use('/', ROUTER);

app.use('*', (req, res) => {
  res.status(404).render('err404');
});

// Lancement de l'application
app.listen(port, function () {
  console.log('App disponible sur localhost:3000 !');
});
