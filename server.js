var express = require('express');
var app = express();
var path = require('path');
var basicRouter = express.Router();
var bodyParser = require('body-parser')
var parseUrlencoded= bodyParser.urlencoded({extended:false});

// MySql Init
//https://www.npmjs.com/package/mysql
//http://code.tutsplus.com/tutorials/nodejs-for-beginners--net-26314
var mysql = require('mysql');
if (process.env.NODE_ENV === 'production') {
	console.log('PRODUCTION YO');
	var connection = mysql.createConnection({
	  host     : 'us-cdbr-iron-east-03.cleardb.net',
	  user     : 'bbfca2878fc249',
	  password : 'bbe76fea',
	  database : 'heroku_12e17f2b1c1f730'
	});
}
else{
	console.log('local');
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : 'sql',
	  database : 'embark'
	});
}

app.use(bodyParser.urlencoded({extended:false}));

// taken from https://www.youtube.com/watch?v=cUWcZ4FzgmI
app.use(function (req, res, next) { 
	res.header('Access-Control-Allow-Origin-', "*"); 
	res.header('Access-Control-Allow-Methods­','GET,PUT,POST,DELETE'); 
	res.header('Access-Control-Allow-Headers­', 'Content-Type'); 
	next();
})
 
connection.connect();
//connection.query('DROP TABLE Links');
//connection.query('DROP TABLE Votes');

connection.query('SELECT 1 FROM Links LIMIT 1;', function(err, rows, fields) { 
	if(err){
		connection.query('CREATE TABLE Links (' +
			'id int PRIMARY KEY NOT NULL AUTO_INCREMENT,' +
			'datecreated int,' +
			'category VARCHAR(20) NOT NULL,' +
			'subcategory VARCHAR(20),' +
			'title VARCHAR(100) NOT NULL,' +
			'link VARCHAR(1000) NOT NULL,' +
			'challenge VARCHAR(20) NOT NULL,' +
			'description VARCHAR(150) NOT NULL,' +
			'filter VARCHAR(20) NOT NULL)', function(err, rows, fields) { 
		  	if (err) throw err;
		});
	}
	else{
		console.log("Links table exists")
	}
});

connection.query('SELECT 1 FROM Votes LIMIT 1;', function(err, rows, fields) { 
	if(err){
		connection.query('CREATE TABLE Votes (' +
			'id int PRIMARY KEY NOT NULL AUTO_INCREMENT,' +
			'linkid int,' +
			'timeVoted int,' +
			'voteNumber int)', function(err, rows, fields) { 
		  	if (err) throw err;
		});
	}
	else{
		console.log("Votes table exists")
	}
});

// viewed at http://localhost:8080
basicRouter.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});



app.use(express.static(__dirname + '/public'));

app.get('/voteTotal', function (req, res){
	connection.query('SELECT COUNT(distinct l.title) as linkTot, COUNT(v.linkid) AS votes, l.category FROM Links l INNER JOIN Votes v ON l.id = v.linkid GROUP BY l.category;', function (err, result, fields) {
		if (err) throw err;
		res.send(result)
	})
})

//COMMENT APPROPRIATELY THROUGHOUT
app.get('/linkList', function(req, res){
	var listKey= req.query.listKey;
	connection.query('SELECT l.id, l.datecreated, l.category, l.subcategory, l.title, l.link, l.challenge, l.description, l.filter, COUNT(v.linkid) AS votes FROM Links l INNER JOIN Votes v ON l.id = v.linkid WHERE l.category=? GROUP BY l.id ORDER BY votes ASC;', [listKey] ,function(err, result, fields) {
		if (err) throw err;
		res.send(result)
	})
});

app.get('/subLinkList', function(req, res){
	var listKey= req.query.listKey;
	var subKey= req.query.subKey;
	connection.query('SELECT l.id, l.datecreated, l.category, l.subcategory, l.title, l.link, l.challenge, l.description, l.filter, COUNT(v.linkid) AS votes FROM Links l INNER JOIN Votes v ON l.id = v.linkid WHERE l.category=? AND l.subcategory=? GROUP BY l.id ORDER BY votes ASC;', [listKey,subKey] ,function(err, result, fields) {
		if (err) throw err;
		res.send(result)
	})
});

app.post('/addLink', function(req, res){
	var newPlan = req.body;
	var curTime = Math.floor(Date.now() / 1000)

	var link = {datecreated: curTime, category: req.body.category, subcategory: req.body.subcat, title: req.body.title, link: req.body.link, challenge: req.body.radio1, description: req.body.desc, filter: req.body.radio2};
	connection.query('INSERT INTO Links SET ?', link,  function(err, result, fields) {
		var key= result.insertId
		if (err) throw err;
		var vote = {linkid: key, timeVoted: curTime, voteNumber: 1}
		connection.query('INSERT INTO Votes SET ?', vote,  function(err, result, fields) {
			if (err) throw err;
		});
	});
	link['votes'] = 1;
	res.send(link);	
})

//update vote count in userplans
app.post('/addVote', function(req, res){
	var uniqueid= req.body.myid;
	var count = req.body.votecount
	var curTime = Math.floor(Date.now() / 1000)
	//Need to make this an array with 2 elements to feed it in
	var vote = {linkid: uniqueid, timeVoted: curTime, voteNumber: count}
	connection.query('INSERT INTO Votes SET ?', vote,  function(err, result, fields) {
		if (err) throw err;
	});
	return res.sendStatus(200);
})

app.use('/', basicRouter)

//connection.end();
app.listen(process.env.PORT || 8080, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});