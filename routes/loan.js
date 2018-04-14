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
    var loanedOn = moment().format('YYYY-MM-D');
    var returnDate = moment().add(7, 'days').format('YYYY-MM-D');
    console.log(req.body);
    var loan = {
        book_id: req.body.book_id,
        patron_id: req.body.patron_id,
        loaned_on: moment(req.body.loaned_on),
        return_by: moment(req.body.return_by)
    }
    Loan.create(loan).then(function(){
        res.redirect("/all_loans");
    });
});

//create a brand new loan
router.get('/new_loan', function(req, res) {
    var loanedOn = moment().format('YYYY-MM-D');
    var returnDate = moment().add(7, 'days').format('YYYY-MM-D');
    Book.findAll().then(function(books){
        Patron.findAll().then(function(patrons){
            res.render('new_loan', {books: books, patrons: patrons, loanedOn: loanedOn, returnDate: returnDate})
        });
    });

});

router.put('/update/:id/:location', function(req, res, next) {
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
            if(req.params.location == 1){
                res.redirect('/all_patrons/patron_detail/' + loan.patron_id)
            }

        });
    });
});

module.exports = router;