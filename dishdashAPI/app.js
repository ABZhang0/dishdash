var express = require('express');
var app = express();
var mongoose = require('mongoose');

app.use('/restaurant', require('./routes/restaurant'));
// app.use('/dish', require('./controllers/dish'));

mongoose.connect(
  'mongodb+srv://test-user_0:i9fVy98g7PpquUSN@cluster0-pmoyv.azure.mongodb.net/db-dishdash?retryWrites=true&w=majority',
  { useNewUrlParser: true },
  function(err) {
    if (err) {
      console.log('Unable to connect to Mongo');
      process.exit(1);
    } else {
      app.listen(3000, function() {
        console.log('Listening on port 3000...')
      });
    }
  }
);