var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/../views/index.html'));
});

router.get('/angular', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/../views/angular.html'));
});

router.get('/react', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/../views/react.html'));
});

module.exports = router;
