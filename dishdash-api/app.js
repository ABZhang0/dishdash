var express = require('express');
var app = express();
var mongoose = require('mongoose');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.use('/dish', require('./controllers/dish'));
app.use('/restaurant', require('./routes/restaurant'));
app.use('/recommendation', require('./routes/recommendation'))

mongoose.connect(
  'mongodb+srv://test-user_0:i9fVy98g7PpquUSN@cluster0-pmoyv.azure.mongodb.net/db-dishdash?retryWrites=true&w=majority',
  { useNewUrlParser: true },
  function(err) {
    if (err) {
      console.log('Unable to connect to Mongo');
      process.exit(1);
    } else {
      app.listen(3001, function() {
        console.log('Listening on port 3001...')
      });

      mongoose.connection.on('error', err => {
        console.error(err);
      });
    }
  }
);