var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');

router.get('/', function(req, res) {
	res.redirect('/burgers');
});

router.post('burgers/create', function(req, res){
	burger.create(req.body.burger_name, function(){

	});
});

module.exports = router;