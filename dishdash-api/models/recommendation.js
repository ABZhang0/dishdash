var mongoose = require('mongoose');

var RecommendationSchema = mongoose.Schema({
  restaurant: {
    type: String,
    required: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
}, {
  collection: 'recommendations',
});

module.exports = mongoose.model('Recommendation', RecommendationSchema);