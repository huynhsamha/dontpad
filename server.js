'use strict';

/**
 * Run file .env to set environment variables
 */
require('dotenv').config();

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var cors = require('cors');
var helmet = require('helmet');
var compression = require('compression');
var mongoose = require('mongoose');
var dbConfig = require('./config/db');

mongoose.connect(dbConfig.uriMongo, {}, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connect mongo ok');
  }
});

require('./server/models/dontpad');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));
// use for deploy production with build/
app.use(cors());
app.use(helmet());
app.use(compression());

var route = require('./server/routes');

app.use('/api', route);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

var port = process.env.PORT || '4200';
app.set('port', port);

var server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
