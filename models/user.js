var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    lasename    : String,
    username    : String,
    password    : String,
});

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return password === this.password;
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);