var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist',['contactlist']);
var bodyParser = require('body-parser');


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactlist', function(req, res){
	console.log("I Receive Get Request");

	db.contactlist.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	});
app.post('/contactlist', function(req, res){
	console.log(req.body);
	db.contactlist.insert(req.body, function(err, doc){
		res.json(doc);
	});
});

	// person1 = {
	// 		name: 'Tom',
	// 		email: 'tom@live.com',
	// 		number: '123-456789'
	// 	};
	// 	person2 = {
	// 		name: 'jhon',
	// 		email: 'jhon@gmail.com',
	// 		number: '321-987654'
	// 	};
	// 	person3 = {
	// 		name: 'max',
	// 		email: 'maxter@yahoo.com',
	// 		number: '987-654321'
	// 	};
	// 	var contactlist = [person1, person2, person3];
	// 	res.json(contactlist);
});
// app.get('/',function (req, res) {
// 	// body...
// 	res.send("Hello World! From Server.js")
// });

app.delete('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log(id);	
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

app.get('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

app.put('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log(req.body.name);
	db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
	new: true}, function(err, doc){
		res.json(doc);
	});
});
app.listen(3000);
console.log("Server Running on Port 3000");
