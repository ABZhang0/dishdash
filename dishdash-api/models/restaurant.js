var mongoose = require('mongoose');

var RestaurantSchema = mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  names: {
    type: Array,
    required: true,
  },
}, {
  collection: 'restaurants',
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);