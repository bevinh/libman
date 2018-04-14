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
    }).catch(function(error) {
        console.log(error)
        if (error.name === "SequelizeValidationError"){
            res.render("new_book", {
                title: req.body.title,
                errors: error.errors
            })
        } else {
            throw error;
        }
    }).catch(function(error) {
        res.status(400).json(error);
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
        Loan.findOne({include: [
            {model: Book, required: true},
            {model: Patron, required: true}],
            where: { id: req.params.id}}).then(function(loan){
            res.render('return_book', {date: d, loan: loan})
        });
});

//function to actually update the above loan
router.put('/return_book/:id/:location', function(req, res, next) {
     Loan.belongsTo(Book, {foreignKey: 'book_id'});
     Loan.belongsTo(Patron, {foreignKey: 'patron_id'});
         Loan.findOne({include: [
             {model: Book, required: true},
             {model: Patron, required: true}],
             where: { id: req.params.id}}).then(function(loan){
                 console.log(loan)
                 var loan_update = {
                     returned_on: req.body.returned_on
                 };
                loan.update(loan_update);
             res.redirect('/all_patrons/patron_detail/' + loan.patron_id);
         })
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
router.get('/book_detail/:id', function(req, res) {
    Loan.belongsTo(Book, {foreignKey: 'book_id'});
    Loan.belongsTo(Patron, {foreignKey: 'patron_id'});
    var date = moment();
    Book.findById(req.params.id).then(function (book) {
        Loan.findAll({
            include: [
                {model: Book, required: true},
                {model: Patron, required: true}],
            where: {book_id: book.id}
        }).then(function (loans) {
            res.render('book_detail', {book: book, loans: loans})
        });
    });

//update book function
    router.put('/book_detail/:id', function (req, res) {
        Book.findById(req.params.id).then(function (book) {
            return book.update(req.body);
        }).then(function (book) {
            res.redirect('/all_books');
        }).catch(function (err) {
            // if validation error, re-render page with error messages
            if (err.name === 'SequelizeValidationError') {
                Book.findAll({
                    include: [{model: Loan, include: [{model: Patron}]}],
                    where: {id: req.params.id}
                })
            }
        });
    });
});
module.exports = router;
