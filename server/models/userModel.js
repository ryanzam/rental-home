var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    email: {
        type:String,
        required: true
    },
    password: {
        type:String,
        required: true
    }
    
});

const User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = function(id, next){
    User.findById(id, next);
}

module.exports.getUserByEmail = function(email, next){
    const query = {email: email};
    User.findOne(query, next);
}

module.exports.addUser = function(user, next){
    bcrypt.genSalt(5, (err, salt)=>{
        bcrypt.hash(user.password, salt, (err, hash)=>{
            user.password = hash;
            user.save(next);
        });
    });
}

module.exports.comparePass = function(currentPass, hash, next){
    bcrypt.compare(currentPass, hash, (err, pwMatch)=>{
        if (err) throw err;
        next(null, pwMatch);
    });
}

