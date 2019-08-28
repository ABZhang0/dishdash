var mongoose = require('mongoose');

var RecommendationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  alias: {
    type: String,
    required: true,
  },
  dishes: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
}, {
  collection: 'recommendations',
});

module.exports = mongoose.model('Recommendation', RecommendationSchema);