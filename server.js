const express = require('express'),
      app = express(),
      handlebars = require('express-handlebars');

app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    defaultLayout: 'main',
}));

/* Permet de le diriger vers le dossier assets à fin 
   d'utiliser le css/js/images 
*/
app.use('/assets', express.static('assets'));

const fakeDB = require('./fakedb.json')

app.get('/', function(req, res) {
    res.render('index');
})

app.get('/admin', function(req, res) {
    res.render('admin', { kakawait: fakeDB.users});
})

app.get('/blog', function(req, res) {
    res.render('blog');
})

app.listen (3000, function() {
    console.log('App disponible sur localhost:3000 !');
});