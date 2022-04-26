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
  connectDB = require ('./back/config/database'),
  ROUTER_API = require('./back/router-controller-api/'),
  ROUTER = require('./back/router.js'),
  expressSession = require('express-session'),
  MySQLStore = require("express-mysql-session")(expressSession),
  handlebars = require('express-handlebars'),
  swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./swagger-config/swagger.json'),
  helmet = require('helmet'),
  { ifstatus, commentDateFormat, calendarDate, ifAnd } = require('./back/helper');

// Method-Override
app.use(methodOverride('_method'));

// Connexion DB
connectDB.connect();

// const expressOasGenerator = require('express-oas-generator');
// expressOasGenerator.init(app, {});

// Body-Parser, parser mes data d'une req
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Config Handlebars et Définis le moteur de mon app
app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({
  helpers: {
    ifstatus,
    commentDateFormat,
    calendarDate,
    ifAnd
  },
  extname: 'hbs',
  defaultLayout: 'main'
}));

/* 
 * Permet de le diriger vers le dossier assets à fin 
 * d'utiliser le css/js/images 
*/
app.use('/assets', express.static('assets'));

app.disable('x-powered-by');
// app.use(helmet());

// Gestion de la session
app.use(expressSession({
  secret: 'keyboard cat',
  name: 'sessionID',
  saveUninitialized: true,
  resave: false,
  store: new MySQLStore(dbOption)
}));

// Session Connexion for use HBS
app.use('*', (req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.token = req.session.forgot;
  next();
})

// Swagger-ui-express
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Router-api.js
app.use('/api', ROUTER_API)

// Router.js
app.use('/', ROUTER);

app.use('*', (req, res) => {
  res.status(404).render('err404');
});

// Lancement de l'application
app.listen(port, function () {
  console.log('App disponible sur localhost:3000 !');
});

module.exports= { app };
