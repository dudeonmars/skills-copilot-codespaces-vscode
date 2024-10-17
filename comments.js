// create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/comments', function(req, res) {
    fs.readFile('comments.json', function(err, data) {
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

app.post('/comments', function(req, res) {
    fs.readFile('comments.json', function(err, data) {
        var comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(comments));
        });
    });
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});