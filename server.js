var express = require('express');
var app = express();
var path = require('path');
var basicRouter = express.Router();
var bodyParser = require('body-parser')
var parseUrlencoded= bodyParser.urlencoded({extended:false});
var userPlans={};

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
 
connection.connect();
//connection.query('DROP TABLE Plans');
//connection.query('DROP TABLE Entries');

connection.query('SELECT 1 FROM Plans LIMIT 1;', function(err, rows, fields) { 
	if(err){
		connection.query('CREATE TABLE Plans (' +
			'id int PRIMARY KEY NOT NULL AUTO_INCREMENT,' +
			'category VARCHAR(10),' +
			'title VARCHAR(50),' +
			'name VARCHAR(50),' +
			'advice VARCHAR(140),' +
			'upvotes int,' +
			'uniqueid int,' +
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
			'plan_id VARCHAR(10) PRIMARY KEY NOT NULL,' +
			'plancat1 VARCHAR(10),' +
			'planname1 VARCHAR(40),' +
			'planlink1 VARCHAR(1000),' +
			'plandesc1 VARCHAR(140),' +
			'plancat2 VARCHAR(10),' +
			'planname2 VARCHAR(40),' +
			'planlink2 VARCHAR(1000),' +
			'plandesc2 VARCHAR(140),' +
			'plancat3 VARCHAR(10),' +
			'planname3 VARCHAR(40),' +
			'planlink3 VARCHAR(1000),' +
			'plandesc3 VARCHAR(140),' +
			'plancat4 VARCHAR(10),' +
			'planname4 VARCHAR(40),' +
			'planlink4 VARCHAR(1000),' +
			'plandesc4 VARCHAR(140),' +
			'plancat5 VARCHAR(10),' +
			'planname5 VARCHAR(40),' +
			'planlink5 VARCHAR(1000),' +
			'plandesc5 VARCHAR(140))', function(err, rows, fields) {	
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

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(__dirname + '/public'));

app.get('/planList', function(req, res){
	var listKey= req.query.listKey;
	if(listKey in userPlans){
		//push all the arrays in that bucket so they can be listed for user
		for(var i=0; i<userPlans[listKey].length; i++){
			res.json(userPlans[listKey][i]);
			connection.query('SELECT * FROM Plans INNER JOIN Entries ON Plans.plan_id = Entries.plan_id WHERE Plans.plan_id="'+listKey+i+'";', function(err, result, fields) { 
				if (err) throw err;
			})
		}
	}
	res.end();
});

app.post('/addPlan', function(req, res){
	var newPlan = req.body;
	var planData=[];
	//what category to use to bucket it
	var catKey= req.body.category;

	//Overall header for the new plan
	planData.push(req.body.title, req.body.firstname, req.body.advice)
	//Do not count the category, three items in header and number of upvotes
	var arrLength= Object.keys(newPlan).length -5
	//Add to the array each of the appropriate fields for each category
	var entries = {};
	for(var i=1; i<=(arrLength/4); i++){
		planData.push(newPlan['radio'+i], newPlan['name['+i+']'], newPlan['link['+i+']'], newPlan['desc['+i+']']);
		entries['plancat'+i] = newPlan['radio'+i];
		entries['planname'+i] = newPlan['name['+i+']'];
		entries['planlink'+i] = newPlan['link['+i+']'];
		entries['plandesc'+i] = newPlan['desc['+i+']'];
	}

	//finally, add the number of upvotes as last array item
	planData.push(req.body.upvotes);
	//initialize category if it does not already exist
	if (!userPlans[catKey]) {
		userPlans[catKey] = [];
	}
	//unique identifier that is the key, in the array
	var uniqueid= userPlans[catKey].length
	planData.push(uniqueid)

	//Add it to the Entries table, then check out results
	entries['plan_id']= catKey+uniqueid;
	connection.query('INSERT INTO Entries SET ?', entries,  function(err, result, fields) {
		if (err) throw err;
	});

	//Add it to the Plans table, then check out results
	var plan = {category: catKey, title: req.body.title, name: req.body.firstname,advice: req.body.advice, upvotes: req.body.upvotes, uniqueid: uniqueid, plan_id : catKey+uniqueid};
	connection.query('INSERT INTO Plans SET ?', plan,  function(err, result, fields) {
		if (err) throw err;
	});

	//Add it to the universal object so that we can access it again
	userPlans[catKey].push(planData);
	res.send(planData);
})

//update vote count in userplans
app.post('/addVote', function(req, res){
	var uniqueid= req.body.myid;
	var voteCount = req.body.votecount;
	var category= req.body.category;
	var voteCountIndex= userPlans[category][uniqueid].length-2;
	var fullArray=userPlans[category];
	fullArray[uniqueid][voteCountIndex]= voteCount;
	connection.query('UPDATE Plans SET upvotes="'+voteCount+'" WHERE plan_id="'+category+uniqueid+'";', function(err, result, fields) {
		if (err) throw err;
	});
	return res.sendStatus(200);
})

app.use('/', basicRouter)

//connection.end();
app.listen(8080);