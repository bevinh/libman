const express = require('express');
const app = express();
var books = require('./routes/book');
var patrons = require('./routes/patron');
var loans = require('./routes/loan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.use(methodOverride('_method'));
app.locals.moment = require('moment');

app.set('view engine', 'pug');
app.use('/static', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.render('home')
});

app.use('/all_books', books);

app.use('/all_patrons', patrons);

app.use('/all_loans', loans);


module.exports = app;