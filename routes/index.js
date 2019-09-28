var express = require('express');
var router = express.Router();
var hr = require('./hr');
var role = require('./role');
var user = require('./user');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


router.get('/hr', hr);

router.get('/role', role);

router.get('/user', user);


module.exports = router;
