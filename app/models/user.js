var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    avatar: {type: String, required: true, default: 'default_avatar.jpg'},
});

module.exports = mongoose.model('user', UserSchema);