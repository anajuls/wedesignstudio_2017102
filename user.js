var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({ 
    item: String,
    price: Double
});

module.exports = mongoose.model('User', userSchema);