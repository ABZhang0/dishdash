var express = require('express');
var router = express.Router();

var Recommendation = require('../models/recommendation');

router.get('/', function(req, res) {
  Recommendation.findOne({ name: req.query.restaurantName }, function(err, doc) {
    res.send({ recommendation: doc });
  });
});

router.get('/all', function(req, res) {
  Recommendation.find({}, function(err, docs) {
    res.send({ recommendations: docs });
  });
});

module.exports = router;