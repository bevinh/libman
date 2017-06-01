const express = require('express');
var router = express.Router();
var Loan = require("./models").Loan;


router.get('/', function(req, res){
    res.render('all_loans')
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