const express = require('express');
const app = express();
app.set('view engine', 'pug');
app.use('/static', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.render('home')
});

app.get('/all_books', function(req, res){
    res.render('all_books')
});

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

app.get('/book_detail', function(req, res){
    res.render('book_detail')
});

app.get('/new_book', function(req, res){
    res.render('new_book')
});

app.get('/return_book', function(req, res){
    res.render('return_book')
});

app.get('/checked_books', function(req, res){
    res.render('checked_books')
});

app.get('/overdue_books', function(req, res) {
    res.render('overdue_books')
});

app.get('/patron_detail', function(req, res){
    res.render('patron_detail')
});

module.exports = app;