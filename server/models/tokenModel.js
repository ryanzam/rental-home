var mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    token: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        required: true,
        expires: 86400,
        default: Date.now()
    }
});

const Token = module.exports = mongoose.model('Token', tokenSchema);


module.exports.getTokenByToken = function(token, next){
    const query = {token: token};
    Token.findOne(query, next);
}
