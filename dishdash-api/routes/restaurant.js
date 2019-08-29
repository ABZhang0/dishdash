var express = require('express');
var router = express.Router();

var Restaurant = require('../models/restaurant');

router.get('/all', function(req, res) {
  Restaurant.find({}, function(err, docs) {
    res.send({ restaurants: docs });
  });
});

module.exports = router;