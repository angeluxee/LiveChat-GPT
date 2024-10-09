var mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema({
    sender: {type: String, required: true},
    message: {type: String, required: true},
    room: {type: Number, ref: 'Room', required: true},
    avatar: {type: String, required: false},
}, { timestamps: true });

module.exports = mongoose.model('chat', ChatSchema);