var express = require('express');
var mongojs = require('mongojs');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var config = require('./oauth.js');
var GoogleStrategy = require('passport-google-oauth2').Strategy;

var User = require('./user.js');

var app = express();

var db = mongojs('mongodb://admin:pass@ds011389.mlab.com:11389/mongotutdb', ['contactlist']);
var port = process.env.PORT || 8000;

// serialize and deserialize
passport.serializeUser(function(user, done) {
  console.log('serializeUser: ' + user._id);
  done(null, user._id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user){
    console.log(user);
      if(!err) done(null, user);
      else done(err, null);
    });
});

// Passport config
passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL,
    passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
            return done(null, profile);
        });
    }
));

app.use(express.static(__dirname + '/public'), function(req, res, next) {
    console.log('req.originalUrl ' + req.originalUrl);
    console.log('req.baseUrl ' + req.baseUrl);
    console.log('req.path ' + req.path);
    next();
});
app.use(bodyParser.json());

console.log('Dirname: ' +__dirname);

app.get('/contactlist', function(req, res) {
    console.log('GET request received');

    db.contactlist.find(function(err, docs) {
        console.log('inside find');
        if (err) {
            console.log(err);
            return false;
        }
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

// Config request on google auth
app.get('/auth/google',
    passport.authenticate('google', { scope: [
        'https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/plus.profile.emails.read'
    ]}
));
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
        console.log('about to be redirected to "/"');
        res.redirect('/');
        console.log('was redirected to "/"');
    });

app.listen(port);
console.log('Server up and running in port 8000');
