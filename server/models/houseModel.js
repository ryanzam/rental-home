var mongoose = require('mongoose');

var houseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    availablity: {
        type: Date,
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
    }
});

const House = module.exports = mongoose.model('House', houseSchema);

module.exports.getHouseById = function(id, next){
    House.findById(id, next);
}

module.exports.getHouseByLocation = function(location, next){
    const query = {location: location};
    User.find(query, next);
}

