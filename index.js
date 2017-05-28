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

app.get('/all_loans', function(req, res){
    res.render('all_loans')
});

app.get('/book_detail', function(req, res){
    res.render('book_detail')
});

app.get('/patron_detail', function(req, res){
    res.render('patron_detail')
});

app.listen(3000, function () {
    console.log('Libman listening on port 3000!')
});