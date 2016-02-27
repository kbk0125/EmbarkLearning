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
//connection.query('DROP TABLE Links');

connection.query('SELECT 1 FROM Links LIMIT 1;', function(err, rows, fields) { 
	if(err){
		connection.query('CREATE TABLE Links (' +
			'id int PRIMARY KEY NOT NULL AUTO_INCREMENT,' +
			'datecreated int,' +
			'category VARCHAR(20) NOT NULL,' +
			'subcategory VARCHAR(20),' +
			'title VARCHAR(50) NOT NULL,' +
			'link VARCHAR(1000) NOT NULL,' +
			'challenge VARCHAR(20) NOT NULL,' +
			'description VARCHAR(150) NOT NULL,' +
			'filter VARCHAR(20) NOT NULL,' +
			'upvotes int)', function(err, rows, fields) { 
		  	if (err) throw err;
		});
	}
	else{
		console.log("Links table exists")
	}
});

// viewed at http://localhost:8080
basicRouter.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});



app.use(express.static(__dirname + '/public'));

app.get('/voteTotal', function (req, res){
	connection.query('SELECT SUM(upvotes) AS voteTot, COUNT(id) as linkTot, category FROM Links GROUP BY category;', function (err, result, fields) {
		res.send(result)
	})
})

//COMMENT APPROPRIATELY THROUGHOUT
app.get('/linkList', function(req, res){
	var listKey= req.query.listKey;

	connection.query('SELECT * FROM Links l WHERE l.category=? ORDER BY upvotes ASC;', [listKey] ,function(err, result, fields) {
		if (err) throw err;
		res.send(result)
	})
});

app.get('/subLinkList', function(req, res){
	var listKey= req.query.listKey;
	var subKey= req.query.subKey;
	connection.query('SELECT * FROM Links l WHERE l.category=? AND l.subcategory=? ORDER BY upvotes ASC;', [listKey,subKey] ,function(err, result, fields) {
		if (err) throw err;
		res.send(result)
	})
});

app.post('/addLink', function(req, res){
	var newPlan = req.body;
	var curTime = Math.floor(Date.now() / 1000)

	var link = {datecreated: curTime, category: req.body.category, subcategory: req.body.subcat, title: req.body.title, link: req.body.link, challenge: req.body.radio1, description: req.body.desc, filter: req.body.radio2, upvotes: 1};
	connection.query('INSERT INTO Links SET ?', link,  function(err, result, fields) {
		if (err) throw err;
	});

	res.send(link);	
})

//update vote count in userplans
app.post('/addVote', function(req, res){
	var uniqueid= req.body.myid;
	var count = req.body.votecount

	//Need to make this an array with 2 elements to feed it in
	connection.query('UPDATE Links SET upvotes=? WHERE id=?;',[count, uniqueid], function(err, result, fields) {
		if (err) throw err;
	});
	return res.sendStatus(200);
})

app.use('/', basicRouter)

//connection.end();
app.listen(8080);