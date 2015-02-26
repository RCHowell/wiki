var express = require('express');
var router = express.Router();
var wiki = require('wikifetch');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { data: 'Express' });
});

module.exports = router;
