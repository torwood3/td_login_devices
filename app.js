var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var mongoose = require('mongoose');
var cors = require('cors');
var fs = require('fs');

var User = require('./models/user');
fs.statSync('database.js', function(err, stat) {
    if(err == null) {
        var configDB = require('./database.js');
        mongoose.connect(configDB.url); // connect to our database
    } else if(err.code == 'ENOENT') {
        mongoose.connect(process.env.mongoURL); // connect to our database
    }
});
var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(helmet());
//app.disable('x-powered-by');
app.use(cors());

var routes = require('./routes/index');
var users = require('./routes/users')();
var api = require('./routes/api');

function isLoggedIn(req, res, next) {
    if ( "GET" == req.method )
        req.sessionID = req.query.sessionID;
    else
        req.sessionID = req.body.sessionID;

    if(req.sessionID) {
        User.findById(req.sessionID, function (err, user) {
            if (err)
                return res.status(401).end('0');
            next();
        });
    }
}

app.use('/', routes);
app.use('/users', users);
app.use('/api', isLoggedIn, api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    console.log("404");
    res.status(404).end();
});

module.exports = app;
