const express = require('express');
var router = express.Router();
var Patron = require("./../models/index").Patron;
var Book = require("./../models/index").Book;
var Loan = require("./../models/index").Loan;

//TODO: Update functions

//find all patrons
router.get('/', function(req, res){
    Patron.findAll().then(function(patrons) {
        res.render('all_patrons', {patrons: patrons})
    });
});

//build a new patron
router.post('/new', function(req, res){
    Patron.create(req.body).then(function() {
        res.redirect("/all_patrons");
    });
});

//create a new patron
router.get('/new_patron', function(req, res){
    res.render('new_patron')
});

router.get('/patron_detail/:id', function(req, res){
    Loan.belongsTo(Book, {foreignKey: 'book_id'});
    Loan.belongsTo(Patron, {foreignKey: 'patron_id'});
    Patron.findById(req.params.id).then(function(patron){
        Loan.findAll({include: [
            {model: Book, required: true},
            {model: Patron, required: true}],
            where: { patron_id: patron.id}}).then(function(loans){
            res.render('patron_detail', {patron: patron, loans: loans})
        });
    });

});

module.exports = router;