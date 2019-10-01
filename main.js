var express     = require('express');

var app         = express();

var bodyParser  = require('body-parser');



app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());



var port = process.env.PORT || 3000;

var router = require('./routes/index')(app);



// [RUN SERVER]

var server = app.listen(port, function(){

 console.log("Express server has started on port " + port)

});
