var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var helmet = require('helmet');
var mongoose = require('mongoose');
var cors = require('cors');

var configDB = require('./database.js');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(session({
    secret : 'iwa',
    name : 'sessionId',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize()); // Add passport initialization
app.use(passport.session()); // Add passport initialization
app.disable('x-powered-by');

mongoose.connect(configDB.url); // connect to our database

require('./passport.js')(passport);

var routes = require('./routes/index');
var users = require('./routes/users')(passport);
var api = require('./routes/api');

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.json({error: "Not logged"});
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
