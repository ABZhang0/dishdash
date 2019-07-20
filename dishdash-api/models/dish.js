var mongoose = require('mongoose');

var DishSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
}, {
  collection: 'dishes',
});

module.exports = mongoose.model('Dish', DishSchema);