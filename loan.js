const express = require('express');
var router = express.Router();
var Loan = require("./models").Loan;
var Book = require("./models").Book;
var Patron = require("./models").Patron;



router.get('/', function(req, res){
    Loan.belongsTo(Book, {foreignKey: 'book_id'});
    Loan.belongsTo(Patron, {foreignKey: 'patron_id'});
    Loan.findAll({include: [
        {model: Book, required: true},
        {model: Patron, required: true}]}).then(function(loans) {
        res.render('all_loans', {loans: loans})
    });
});

router.get('/overdue_loans', function(req, res){
    res.render('overdue_loans')
});

router.get('/checked_loans', function(req, res){
    res.render('checked_loans')
});

router.get('/new_loan', function(req, res) {
    res.render('new_loan')
});

module.exports = router;