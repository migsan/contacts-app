var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send('hello there!');
});

app.listen(8888);
console.log('Server up and running in port 8888');
