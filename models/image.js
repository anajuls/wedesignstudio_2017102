var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
    filename: String,
    
});

module.exports = mongoose.model('Image', imageSchema);