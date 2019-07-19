var mongoose = require('mongoose');

var RestaurantSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
}, {
  collection: 'restaurants',
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);