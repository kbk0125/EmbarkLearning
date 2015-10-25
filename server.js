var express = require('express');
var app = express();
var path = require('path');
var basicRouter = express.Router();
var bodyParser = require('body-parser')
var parseUrlencoded= bodyParser.urlencoded({extended:false});

// MySql Init
//https://www.npmjs.com/package/mysql
//http://code.tutsplus.com/tutorials/nodejs-for-beginners--net-26314
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'sql',
  database : 'embark'
});

app.use(bodyParser.urlencoded({extended:false}));
 
connection.connect();
connection.query('DROP TABLE Plans');
connection.query('DROP TABLE Entries');

connection.query('SELECT 1 FROM Plans LIMIT 1;', function(err, rows, fields) { 
	if(err){
		connection.query('CREATE TABLE Plans (' +
			'id int PRIMARY KEY NOT NULL AUTO_INCREMENT,' +
			'uniqueid int,' +
			'category VARCHAR(10),' +
			'upvotes int,' +
			'name VARCHAR(50),' +
			'title VARCHAR(50),' +
			'advice VARCHAR(140),' +
		  	'plan_id VARCHAR(10) NOT NULL)', function(err, rows, fields) { 
		  	if (err) throw err;
		});
	}
	else{
		console.log("plans table exists")
	}
});

connection.query('SELECT 1 FROM Entries LIMIT 1;', function(err, rows, fields) { 
	if(err){
		connection.query('CREATE TABLE Entries (' +
			'id int PRIMARY KEY NOT NULL AUTO_INCREMENT,' +
			'plan_id VARCHAR(10) NOT NULL,' +
			'plancat VARCHAR(10),' +
			'planname VARCHAR(40),' +
			'planlink VARCHAR(1000),' +
			'plandesc VARCHAR(140))', function(err, rows, fields) {	
		  	if (err) throw err;
		});
	}
	else{
		console.log("Entries table exists")
	}
});



// viewed at http://localhost:8080
basicRouter.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});



app.use(express.static(__dirname + '/public'));

app.get('/planList', function(req, res){
	var listKey= req.query.listKey;
	var specPlans = [];
	connection.query('SELECT p.uniqueid, p.category, p.upvotes, p.name, p.title, p.advice, e.planname, e.planlink, e.plandesc, e.plancat FROM Entries e INNER JOIN Plans p ON e.plan_id = p.plan_id WHERE p.category=?;', [listKey] ,function(err, result, fields) {
		if (err) throw err;
		for(var i=0; i<result.length; i++){
			var eachEntry = result[i];
			var arrayConvert = Object.keys(eachEntry).map(function (key) {return eachEntry[key]});
			var firstNum= arrayConvert[0];
			if(specPlans[firstNum]){
				var origArray= specPlans[firstNum]
				var fullConvert=arrayConvert.slice(6, 10)
				var newArray = origArray.concat(fullConvert)
				specPlans[firstNum] = newArray;
			}
			else{
				specPlans[firstNum]=arrayConvert;
			}
		}
		for(var i=0; i<specPlans.length; i++){
			res.json(specPlans[i])
		}
		res.end();
	})
});

app.post('/addPlan', function(req, res){
	var newPlan = req.body;
	var uniqueid;
	//what category to use to bucket it
	var catKey= req.body.category;

	//Do not count the category, three items in header and number of upvotes
	var arrLength= Object.keys(newPlan).length -5

	//To be sent with each entry
	var entries = {};
	//unique identifier that is the key, in the array taken from # of plans already in that cat
	connection.query('SELECT * From Plans WHERE category=?;', [catKey], function(err, result, fields){
		if (err) throw err;
		uniqueid= result.length;
		entries['plan_id']= catKey+uniqueid;

		for(var i=1; i<=(arrLength/4); i++){
			entries['plancat'] = newPlan['radio'+i];
			entries['planname'] = newPlan['name['+i+']'];
			entries['planlink'] = newPlan['link['+i+']'];
			entries['plandesc'] = newPlan['desc['+i+']'];

			//Add it to the Entries table, then check out results
			connection.query('INSERT INTO Entries SET ?', entries,  function(err, result, fields) {
				if (err) throw err;
			});
		}

		//Add it to the Plans table, then check out results
		var plan = {uniqueid: uniqueid, category: catKey, upvotes: req.body.upvotes, title: req.body.title, name: req.body.firstname,advice: req.body.advice, plan_id : catKey+uniqueid};
		connection.query('INSERT INTO Plans SET ?', plan,  function(err, result, fields) {
			if (err) throw err;
		});

		//Add it to the universal object so that we can access it again
		var arrayIfy = Object.keys(newPlan).map(function (key) {return newPlan[key]});
		arrayIfy.unshift(uniqueid)
		res.send(arrayIfy);
	})	
})

//update vote count in userplans
app.post('/addVote', function(req, res){
	var uniqueid= req.body.myid;
	var voteCount = req.body.votecount;
	var category= req.body.category;
	connection.query('UPDATE Plans SET upvotes="'+voteCount+'" WHERE plan_id="'+category+uniqueid+'";', function(err, result, fields) {
		if (err) throw err;
	});
	return res.sendStatus(200);
})

app.use('/', basicRouter)

//connection.end();
app.listen(8080);