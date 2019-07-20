var mongoose = require('mongoose');

var RestaurantSchema = mongoose.Schema({
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