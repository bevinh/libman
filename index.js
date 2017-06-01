const express = require('express');
const app = express();
var books = require('./book')
app.set('view engine', 'pug');
app.use('/static', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.render('home')
});

app.use('/all_books', books);


app.get('/all_patrons', function(req, res){
    res.render('all_patrons')
});

app.get('/new_patron', function(req, res){
    res.render('new_patron')
});

app.get('/all_loans', function(req, res){
    res.render('all_loans')
});
app.get('/overdue_loans', function(req, res){
    res.render('overdue_loans')
});

app.get('/checked_loans', function(req, res){
    res.render('checked_loans')
});

app.get('/new_loan', function(req, res) {
    res.render('new_loan')
});




app.get('/patron_detail', function(req, res){
    res.render('patron_detail')
});

module.exports = app;