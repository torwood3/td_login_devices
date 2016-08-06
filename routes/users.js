var express = require('express');
var router = express.Router();
var User = require('../models/user');


module.exports = function(){

  router.get('/loggedin/:user_id', function (req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if (err)
        return res.status(401).end('0');

      return res.send(user);
    });
  });

  router.post('/register', function(req, res, next) {

    User.findOne({ 'username' :  req.body.username }, function(err, user) {
      // if there are any errors, return the error
      if (err)
        return res.json({success : false, message: err});

      // check to see if theres already a user with that email
      if (user) {
        res.json({success : false, message: 'Username already used'});
      } else {

        // if there is no user with that email
        // create the user
        var newUser      = new User();

        // set the user's local credentials
        newUser.lasename =  req.body.lasename ;
        newUser.username =  req.body.username ;
        newUser.password =  req.body.password ;

        // save the user
        newUser.save(function(err) {
          if (err)
            throw err;
          return res.json({success : true});
        });
      }

    });
  });

  router.post('/login', function(req, res, next){
    User.findOne({ 'username' :  req.body.username }, function(err, user) {
      // if there are any errors, return the error before anything else
      if (err)
        return done(err);

      // if no user is found, return the message
      if (!user)
        return res.json({success : false, message: 'Wrong username'});

      // if the user is found but the password is wrong
      if (!user.validPassword(req.body.password))
        return res.json({success : false, message: 'Wrong password'});

      // all is well, return successful user
      return res.json({success : true, user:user, sessionID: user.id});
    });

  });

  router.delete('/:user_id', function(req, res){
    User.findById(req.params.user_id, function(err, user) {
      if (err)
        return res.status(401).end('0');

      User.remove({
        _id: req.params.user_id
      }, function(err, user) {
        if (err)
          return res.send(err);

        res.json({ message: 'Successfully deleted' });
      });
    });
  });

  return router
};