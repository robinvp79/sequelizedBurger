var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var models = require('../models');

var sequelizeConnection = models.sequelize;

sequelizeConnection.query('SET FOREIGN_KEY_CHECKS = 0')
.then(function(){
	return models.Burger.sync({force:true})
});

router.get('/', function (req, res) {
	res.redirect('/burgers');
});

router.get('/burgers', function (req, res) {
	models.Burger.findAll({})
	.then(function (data) {
		var burgerObject = { burgers: data };
		res.render('index', burgerObject);
	})
	.catch(function(err){
		throw err;
	});
});

router.post('/burgers/create', function (req, res) {
	models.Burger.create({
		burger_name: req.body.burgerName,
		devoured: false
	}).then(function (burger) {
		res.redirect('/burgers');
	}).catch(function(err){
		throw err;
	});
});

router.put('/burgers/update', function (req, res) {
	models.Burger.update({
		devoured: true
	},{
		where: {id: req.body.id}
	}).then(function (burger) {
		res.redirect('/burgers');
	}).catch(function(err){
		throw err;
	});
});

module.exports = router;