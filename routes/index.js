var express = require('express');
var router = express.Router();
//var controller = require('./../controller/controller.js');
//var http = require("http");
//var https = require("https");
//var schedule = require('node-schedule');
var db = require('./../models');

/* GET home page. */
console.log("Router for APIs:: ");
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/newTask', function(req, res, next) {

	delete req.body.id;
	console.log(":: New Task API ::",req.body);
	var data = req.body;
	var cb = function (err,data){
		if(data){
			console.log("controller Message Reader :: ",data);
			res.status(200).send(data);
		}else
			res.status(200).send(data);
			
	} 
	db.Task.create(data).then(function(data){
		console.log("Model data :: ", data.dataValues)
		cb(null, data.dataValues);
	}).catch(function(err){
		console.log("Model data in error loop :: ", err)
		cb(err, null);
	});

	console.log("Body:: ", req.body);	

});

router.get('/getTask/:isCompleted', function(req, res, next){
	var cb = function(err, data){
		//format of the data
		console.log(data);
		res.send(data);
	};
	var datatable = [];
	if(req.params.isCompleted == 1){
			db.Task.findAll({where: {status: "Completed"}}).then(function(d){
			for(i in d){
				datatable.push(d[i].dataValues);
			}
			console.log("find all data:: ", datatable);
			res.send(datatable);
		});
	}else{
		db.Task.findAll().then(function(d){
			for(i in d){
				datatable.push(d[i].dataValues);
			}
			console.log("find all data:: ", datatable);
			res.send(datatable);
		});
	}
});

router.get('/getCompletedTask', function(req, res, next){
	var cb = function(err, data){
		//format of the data
		console.log(data);
		res.send(data);
	};
	var datatable = [];
	
});

router.post('/deleteTask', function(req, res, next){
	var cb = function(err, data){
		//format of the data
		console.log(data);
		res.send("Rule deleted successfully ");
	};
	console.log("Delete Schedule API:",req.body);

	if(req.body.rule_name){
		db.Task.destroy({
			where: {
				rule_name: req.body.rule_name
			}
		}).then(function(d){
			cb(null,d );
		});
	}
});

router.post('/updateTask', function(req, res, next){
	var cb = function(err, data){
		//format of the data
		console.log(data);
		res.send("Rule deleted successfully ");
	};
	console.log("UPdate record API:",req.body);
	var data = req.body;
	if(req.body.rule_name){
		db.Task.update(
			{
				rule_name: data.rule_name,
				message_content: data.message_content,					status: data.status,
				priority: data.priority,
				trigger_date: data.trigger_date,
				tag: data.tag
				
			},{
				where: {
					id: req.body.id,
					rule_name: req.body.rule_name
				}
			}).then(function(d){
			cb(null,d );
		});
	}
});

module.exports = router;
