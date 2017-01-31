var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');

router.get('/', function(req, res){
	res.redirect('/burgers')
});

router.get('/burgers', function (req, res) {
	burger.all(function (data) {
		var object = { burgers: data };
		res.render('index', object);
	});
});

router.post('/burgers/create', function (req, res) {
		var name = req.body.burger_name;
	burger.create(['burger_name'], name , function (data) {
		res.redirect('/burgers');
	});
});

router.put('/burgers/update/:id', function (req, res) {
	var condition = 'id = ' + req.params.id;

	burger.update({ devoured: req.body.devoured }, condition, function (data) {
		res.redirect('/burgers');
	});
});


module.exports = router;