require('dotenv').config();

const express = require('express'),
      app = express(),
      port = process.env.PORT || 3003,
      ROUTER = require('./back/router.js'),
      expressSession = require('express-session'),
      fakeDB = require('./back/database/fakedb.json')
      handlebars = require('express-handlebars');

// Config Handlebars et Définis le moteur de mon app
app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    defaultLayout: 'main',
}));

/* Permet de le diriger vers le dossier assets à fin 
   d'utiliser le css/js/images 
*/
app.use('/assets', express.static('assets')); 

app.use(expressSession({
    secret: 'keyboard cat',
    name: 'sessionID',
    saveUninitialized: true,
    resave: false
}))

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

app.listen (port, function() {
    console.log('App disponible sur localhost:3000 !');
});