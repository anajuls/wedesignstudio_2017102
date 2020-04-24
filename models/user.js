var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({ 
    item: String,
    price: Number
});

module.exports = mongoose.model('User', userSchema);