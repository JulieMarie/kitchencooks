var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var Firebase = require('firebase');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// adding process.env.PORT as the port to listen on when running in an Azure website
var port = process.env.PORT || '3000';

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

var session = require('express-session');
app.use(session({
  secret: 'secret HRR Kitchen k00ks App',
  resave: false,
  saveUninitialized: true
}));

app.get('/logout', function(req, res) {
  req.session.destroy(function() {
    res.redirect('/');
  });
});

app.get('/login', function(req, res) {
  var ref = new Firebase('https://hrr-kitchen.firebaseio.com');

  ref.authWithOAuthPopup('github', function(err, authData) {
    console.log('in authWithOAuthPopup');
    if (err) {
      console.log(err.code);
      if (err.code === "TRANSPORT_UNAVAILABLE") {
        ref.authWithOAuthRedirect('github', function(err, authData) {
          console.log('in authWithOAuthRedirect');
          if (err) {
            console.log(err.code);
          } else if (authData) {
      console.log('User ID: ' + authData.uid + 
                  ', Provider: ' + authData.provider +
                  ', GitHub ID: ' + authData.github.id +
                  ', GitHub Name: ' + authData.github.displayName +
                  ', GitHub Username: ' + authData.github.username);
          }
        });
      }
    } else if (authData) {
      // user authenticated with GitHub
      console.log('User ID: ' + authData.uid + 
                  ', Provider: ' + authData.provider +
                  ', GitHub ID: ' + authData.github.id +
                  ', GitHub Name: ' + authData.github.displayName +
                  ', GitHub Username: ' + authData.github.username);
    }
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// changed from '3000' as the port to the variable port for Azure
app.listen(port);

module.exports = app;
