var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Restaurant = require('../models/restaurant');

router.get('/all', function(req, res) {
  Restaurant.find({}, function(err, docs) {
    console.log(docs);
    // res.render('restaurants', { restaurants: docs });
    res.send({ restaurants: docs });
  });
});

module.exports = router;