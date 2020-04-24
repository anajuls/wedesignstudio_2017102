var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({ 
    item: String,
    price: String
});

module.exports = mongoose.model('User', userSchema);