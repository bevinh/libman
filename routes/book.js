const express = require('express');
var router = express.Router();
var Book = require("./../models/index").Book;
var Loan = require("./../models/index").Loan;
var Patron = require("./../models/index").Patron;
var moment = require('moment');

//all books function
router.get('/', function (req, res) {
    Book.findAll().then(function(books){
        res.render('all_books', {books: books})
    })

});

//new book function
router.post('/new', function(req, res){
    Book.create(req.body).then(function(){
        res.redirect("/all_books");
    });
});

//new book build
router.get('/new_book', function(req, res, next){
    res.render('new_book', {book: Book.build()})
});

router.get('/return_book', function(req, res){
    //TODO: Return book function
    res.render('return_book')
});

//find all checked out books
router.get('/checked_books', function(req, res){
    Loan.belongsTo(Book, {foreignKey: 'book_id'});
    Loan.findAll({include: [
        {model: Book, required: true}],
        where: { returned_on: {$eq: null}}}).then(function(loans) {
        res.render('checked_books', {loans: loans})
    });
});


//find all overdue books
router.get('/overdue_books', function(req, res) {
    Loan.belongsTo(Book, {foreignKey: 'book_id'});
    var date = moment();
    Loan.findAll({include: [
        {model: Book, required: true}],
        where: { return_by: {$lt: date},
        returned_on: {$eq: null}}}).then(function(loans) {
        res.render('overdue_books', {loans: loans})
    });
});

//find the book detail, and get the history of all checkouts
router.get('/book_detail/:id', function(req, res){
    Loan.belongsTo(Book, {foreignKey: 'book_id'});
    Loan.belongsTo(Patron, {foreignKey: 'patron_id'});
    var date = moment();
    Book.findById(req.params.id).then(function(book){
    Loan.findAll({include: [
        {model: Book, required: true},
        {model: Patron, required: true}],
        where: { book_id: book.id}}).then(function(loans){
            res.render('book_detail', {book: book, loans: loans})
        });
    })

});

module.exports = router;
