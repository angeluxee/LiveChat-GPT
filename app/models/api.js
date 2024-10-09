var mongoose = require('mongoose');

var ApiSchema = new mongoose.Schema({
    key: {type: String, required: true},
});

module.exports = mongoose.model('api', ApiSchema);