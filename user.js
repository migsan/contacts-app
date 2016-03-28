var mongoose = require('mongoose');

// create the user model
var User = mongoose.model('User', {
    oauthID: Number,
    name: String,
    created: Date
});

module.exports = User;
