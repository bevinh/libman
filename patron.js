const express = require('express');
var router = express.Router();
var Patron = require("./models").Patron;


router.get('/', function(req, res){
    res.render('all_patrons')
});

router.get('/new_patron', function(req, res){
    res.render('new_patron')
});

router.get('/patron_detail', function(req, res){
    res.render('patron_detail')
});

module.exports = router;