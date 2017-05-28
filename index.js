const express = require('express');
const app = express();
app.set('view engine', 'pug');
app.use('/static', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.render('home')
});

app.get('/all_books', function(req, res){
    res.render('all_books')
});

app.listen(3000, function () {
    console.log('Libman listening on port 3000!')
});