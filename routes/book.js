const express = require('express');
var router = express.Router();
var Book = require("./../models/index").Book;
var Loan = require("./../models/index").Loan;
var Patron = require("./../models/index").Patron;
var moment = require('moment');

//TODO: Update functions


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

//function to get the book loan put together
router.get('/return_book/:id', function(req, res){
    var d = moment().format('YYYY-MM-DD');
    Loan.belongsTo(Book, {foreignKey: 'book_id'});
    Loan.belongsTo(Patron, {foreignKey: 'patron_id'});
    //get the param & identify the book
    Book.findById(req.params.id).then(function(book){
        //identify the loan
        //TODO: Figure out where I came from to send the case for the redirect after update
        Loan.findOne({include: [
            {model: Book, required: true},
            {model: Patron, required: true}],
            where: { book_id: book.id}}).then(function(loan){
            res.render('return_book', {date: d, loan: loan})
        });
    });
});

//function to actually update the above loan
router.put('/return_book/:id/:location', function(req, res, next) {
    Loan.belongsTo(Book, {foreignKey: 'book_id'});
    Loan.belongsTo(Patron, {foreignKey: 'patron_id'});
    Book.findById(req.params.id).then(function(book) {
        //identify the loan
        Loan.findOne({
            include: [
                {model: Book, required: true},
                {model: Patron, required: true}],
            where: {book_id: book.id}
        }).then(function (loan) {
            //update the loan
            return loan.update(req.body);
        }).then(function (loan) {
            //TODO: Finish params
            if(req.params.location == 1){
                res.redirect('/all_patrons/patron_detail/' + loan.patron_id)
            }

        });
    });
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
