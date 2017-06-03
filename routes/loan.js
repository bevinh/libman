const express = require('express');
var router = express.Router();
var Loan = require("./../models/index").Loan;
var Book = require("./../models/index").Book;
var Patron = require("./../models/index").Patron;
var moment = require('moment');


//get all loans
router.get('/', function(req, res){
    Loan.belongsTo(Book, {foreignKey: 'book_id'});
    Loan.belongsTo(Patron, {foreignKey: 'patron_id'});
    Loan.findAll({include: [
        {model: Book, required: true},
        {model: Patron, required: true}]}).then(function(loans) {
        res.render('all_loans', {loans: loans})
    });
});

//get all loans with a return date less than today
router.get('/overdue_loans', function(req, res){
    Loan.belongsTo(Book, {foreignKey: 'book_id'});
    Loan.belongsTo(Patron, {foreignKey: 'patron_id'});
    var date = moment();
    Loan.findAll({include: [
        {model: Book, required: true},
        {model: Patron, required: true}
        ],
        where: { return_by: {$lt: date},
        returned_on: {$eq: null}
        }}).then(function(loans) {
        res.render('overdue_loans', {loans: loans})
    });
});

//get all loans currently checked out with no return date
router.get('/checked_loans', function(req, res){
    Loan.belongsTo(Book, {foreignKey: 'book_id'});
    Loan.belongsTo(Patron, {foreignKey: 'patron_id'});
    Loan.findAll({include: [
        {model: Book, required: true},
        {model: Patron, required: true}
    ],
        where: { returned_on: {$eq: null}}}).then(function(loans) {
        res.render('checked_loans', {loans: loans})
    });
});

//new loan route
router.post('/new', function(req, res){
    Loan.create(req.body).then(function(){
        res.redirect("/all_loans");
    });
});

//create a brand new loan
router.get('/new_loan', function(req, res) {
    //TODO: Figure out why date isn't in proper format.
    var loanedOn = moment().format('YYYY-MM-DD');
    var returnDate = moment().add('7', 'days').format('YYYY-MM-DD');
    Book.findAll().then(function(books){
        Patron.findAll().then(function(patrons){
            res.render('new_loan', {books: books, patrons: patrons, loanedOn: loanedOn, returnDate: returnDate})
        });
    });

});

module.exports = router;