const express = require('express');
const app = express();
var books = require('./book');
var patrons = require('./patron');
var loans = require('./loan');

app.set('view engine', 'pug');
app.use('/static', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.render('home')
});

app.use('/all_books', books);

app.use('/all_patrons', patrons);

app.use('/all_loans', loans);


module.exports = app;