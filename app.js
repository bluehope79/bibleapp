var express = require('express');
var sql = require('mssql');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index_bak');
var users = require('./routes/users');
var port = process.env.PORT || 3000;

var app = express();

// mongodb setup
/*var mongoose = require('mongoose');
var promise = mongoose.connect('mongodb://SOO:sy0131@ds149682.mlab.com:49682/ynqt', {


});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('connected successfully');
});*/

var config = {

  user: 'ttm_friver',
  password: 'frivertkdydwk',
  server: '121.129.55.141',
  port: '1433',
  database: 'tsweb',
  stream: true
}

sql.connect(config, function(err) {
  var request = new sql.Request();
  request.stream = true;
  request.query('select top 10 * from sys.all_objects');
  request.on('row', function(row) {
      console.log('name      : '+ row.name);
      console.log('object_id : '+ row.object_id);
      console.log('');
  });
  request.on('error', function(err) {
      console.log(err);
  });

  request.on('done', function(returnValue) {
  console.log('Data End');
  });
});





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, function(){
  console.log('listening on *:' + port);
});

module.exports = app;
