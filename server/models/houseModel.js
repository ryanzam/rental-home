var mongoose = require('mongoose');

var houseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    }, 
    availability: {
        type: Date
    },
    rent: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    posted: {
        type:Date,
        default: Date.now()
    },
    owner_id: {
        type: String,
        required: true
    },
    houseImage : {
        type: String

    }
});

const House = module.exports = mongoose.model('House', houseSchema);

module.exports.getHouseById = function(id, next){
    House.findById(id, next);
}

module.exports.getHouseByOwnerId = function(owner_id, next){
    const query = {owner_id: owner_id};
    House.find(query, next);
}

