var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:pass@ds011389.mlab.com:11389/mongotutdb', ['contactlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

console.log(__dirname);

app.get('/contactlist', function(req, res) {
    console.log('GET request received');

    db.contactlist.find(function(err, docs) {
        console.log('inside find');
        if (err) {
            console.log(err);
            return false;
        }
        console.log(docs);
        res.json(docs);
    });
});

app.post('/contactlist', function(req, res) {
    console.log(req.body);
    db.contactlist.insert(req.body, function(err, doc) {
        if (err) {
            console.log(err);
            return false;
        }
        res.json(doc);
    });
});

app.delete('/contactlist/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    db.contactlist.remove({ _id: mongojs.ObjectId(id) }, function(err, doc) {
        if (err) {
            console.log(err);
            return false;
        }
        res.json(doc);
    });
});

app.get('/contactlist/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    db.contactlist.findOne({ _id:  mongojs.ObjectId(id) }, function(err, doc) {
        if (err) {
            console.log(err);
            return false;
        }
        res.json(doc);
    });
});

app.put('/contactlist/:id', function(req, res) {
    var id = req.params.id;
    console.log(req.body.name);
    db.contactlist.findAndModify({ query: { _id: mongojs.ObjectId(id) },
        update: { $set: {
            name: req.body.name,
            email: req.body.email,
            number: req.body.number
        }}, new: true},
        function(err, doc) {
            if (err) {
                console.log(err);
                return false;
            }
            res.json(doc);
        }
    );
});

app.listen(8888);
console.log('Server up and running in port 8888');
