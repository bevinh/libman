const express = require('express');
var router = express.Router()
var Book = require("./models").Book;

router.get('/', function (req, res) {
    res.render('all_books')
});

router.get('/new_book', function(req, res){
    res.render('new_book')
});

router.get('/return_book', function(req, res){
    res.render('return_book')
});

router.get('/checked_books', function(req, res){
    res.render('checked_books')
});

router.get('/overdue_books', function(req, res) {
    res.render('overdue_books')
});

router.get('/book_detail', function(req, res){
    res.render('book_detail')
});

module.exports = router;
