var express = require('express');
var router = express.Router();
var wiki = require('wikifetch');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { data: 'Express' });
});

router.get('/wiki/:title', function(req, res, next){
	var title = req.params.title;
	res.render('wiki', {title: title});
});

module.exports = router;
