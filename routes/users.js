var express = require('express');
var router = express.Router();
var User = require('../models/user');


module.exports = function(passport){

  router.get('/loggedin', function (req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  });

  router.post('/register', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
      if (err) { return next(err); }
      // Redirect if it fails
      console.log(info)
      if (!user)
        return res.json({error: "Fail"});

      req.logIn(user, function(err) {
        if (err)
          return next(err);

        return res.json({message: "Success"});
      });
    })(req, res, next);
  });

  router.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
      if (err) { return next(err); }
      if (!user)
        return res.json({error: "Fail"});

      req.logIn(user, function(err) {
        if (err)
          return next(err);

        return res.json({message: "Success", user: user});
      });
    })(req, res, next);
  });

  router.post('/logout', function (req, res) {
    req.logOut();
    res.send(200);
  });

  router.delete('/:user_id', function(req, res){
    if(req.isAuthenticated())
      User.remove({
        _id: req.params.user_id
      }, function(err, user) {
        if (err)
          res.send(err);

        res.json({ message: 'Successfully deleted' });
      });
    else
      res.json({error: "Not logged!"});
  });

  return router
};