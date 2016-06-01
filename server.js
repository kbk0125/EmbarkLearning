var express = require('express');
var connect = require('connect');
var app = express();
var app2 = connect();
var morgan = require('morgan')
var path = require('path');
var request = require('request');
var basicRouter = express.Router();
var bodyParser = require('body-parser')
var parseUrlencoded= bodyParser.urlencoded({extended:false});
var categories = require( "./categories.js" )
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config.js');
var stylus= require('stylus');
var nib= require('nib');

var isDeveloping = process.env.NODE_ENV !== 'production';
var port = isDeveloping ? 8080 : process.env.PORT;

app.use(bodyParser.urlencoded({extended:false}));
app.use(require('serve-favicon')(__dirname+'/public/img/favicon.ico'));



// MySql Init
//https://www.npmjs.com/package/mysql
//http://code.tutsplus.com/tutorials/nodejs-for-beginners--net-26314
var mysql = require('mysql');
if (process.env.NODE_ENV === 'production') {
	console.log('PRODUCTION YO');
	var db_config = {
	  host     : 'us-cdbr-iron-east-03.cleardb.net',
	  user     : 'bbfca2878fc249',
	  password : 'bbe76fea',
	  database : 'heroku_12e17f2b1c1f730'
	};
}
else{
	console.log('local');
	var db_config = {
	  host     : 'localhost',
	  user     : 'root',
	  password : 'sql',
	  database : 'embark'
	};
}

var connection;
//https://github.com/mescalito/MySql-NodeJS-Heroku/blob/master/web.js 
function handleDisconnect() {
	console.log('1. connecting to db:');
	connection = mysql.createPool(db_config); // Recreate the connection, since
													// the old one cannot be reused.

	connection.getConnection(function(err) {              	// The server is either down
		if (err) {                                     // or restarting (takes a while sometimes).
			console.log('2. error when connecting to db:', err);
			setTimeout(handleDisconnect, 1000); // We introduce a delay before attempting to reconnect,
		}                                     	// to avoid a hot loop, and to allow our node script to
	});                                     	// process asynchronous requests in the meantime.
												// If you're also serving http, display a 503 error.
	connection.on('error', function(err) {
		console.log('3. db error', err);
		if (err.code === 'PROTOCOL_CONNECTION_LOST') { 	// Connection to the MySQL server is usually
			handleDisconnect();                      	// lost due to either server restart, or a
		} else {                                      	// connnection idle timeout (the wait_timeout
			throw err;                                  // server variable configures this)
		}
	});
}

handleDisconnect();
//connection.query('DROP TABLE Links');
//connection.query('DROP TABLE Votes');

//CREATE TABLES

connection.query('SELECT 1 FROM Links LIMIT 1;', function(err, rows, fields) { 
	if(err){
		connection.query('CREATE TABLE Links (' +
			'id int NOT NULL,' +
			'datecreated int,' +
			'category VARCHAR(20) NOT NULL,' +
			'subcategory VARCHAR(20),' +
			'title VARCHAR(100) NOT NULL,' +
			'link VARCHAR(1000) NOT NULL,' +
			'challenge VARCHAR(20) NOT NULL,' +
			'description VARCHAR(150) NOT NULL,' +
			'filter VARCHAR(20) NOT NULL,' +
			'PRIMARY KEY (id))', function(err, rows, fields) { 
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
			'id int NOT NULL AUTO_INCREMENT,' +
			'linkid int,' +
			'timeVoted int,' +
			'voteNumber int,' +
			'PRIMARY KEY (id))', function(err, rows, fields) { 
			if (err) throw err;
		});
	}
	else{
		console.log("Votes table exists")
	}
});

//ROUTING

app.use(express.static(__dirname + '/public'));

app.get('/devguide', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/devguide/index.html'));
});

app.get('/learnd3', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/learnd3/index.html'));
});

app.get('/tutorialsoup', function(req, res) {
	res.sendFile(path.join(__dirname + '/tutorialsoup/index.html'));
});



app.get('/voteTotal', function (req, res){
	connection.query('SELECT COUNT(distinct l.title) as linkTot, COUNT(v.linkid) AS votes, l.category FROM Links l INNER JOIN Votes v ON l.id = v.linkid GROUP BY l.category WITH ROLLUP;', function (err, result, fields) {
		if (err) throw err;
		res.send(result)
	})
})

//COMMENT APPROPRIATELY THROUGHOUT
app.get('/linkList', function(req, res){
	console.log(req.params)
	var listKey= req.query.listKey;
	var data=[];
	data.push(categories[listKey]['default'])
	connection.query('SELECT l.id, l.datecreated, l.category, l.subcategory, l.title, l.link, l.challenge, l.description, l.filter, COUNT(v.linkid) AS votes FROM Links l INNER JOIN Votes v ON l.id = v.linkid WHERE l.category=? GROUP BY l.id ORDER BY votes DESC;', [listKey] ,function (err, result, fields) {
		if (err) throw err;
		data.push(result)
		res.send(data)
	})
});

app.get('/subLinkList', function(req, res){
	var listKey= req.query.listKey;
	var subKey= req.query.subKey;
	var data=[];
	data.push(categories[listKey]['subcat'][subKey])
	connection.query('SELECT l.id, l.datecreated, l.category, l.subcategory, l.title, l.link, l.challenge, l.description, l.filter, COUNT(v.linkid) AS votes FROM Links l INNER JOIN Votes v ON l.id = v.linkid WHERE l.category=? AND l.subcategory=? GROUP BY l.id ORDER BY votes DESC;', [listKey,subKey] ,function (err, result, fields) {
		if (err) throw err;
		data.push(result)
		res.send(data)
	})
});

app.get('/subDevList', function(req, res){
	var listKey= req.query.listKey;
	var subKey= req.query.subKey;
	connection.query('SELECT l.id, l.datecreated, l.category, l.subcategory, l.title, l.link, l.challenge, l.description, l.filter, COUNT(v.linkid) AS votes FROM Links l INNER JOIN Votes v ON l.id = v.linkid WHERE l.category=? AND l.subcategory=? GROUP BY l.id ORDER BY votes DESC LIMIT 3;', [listKey,subKey] ,function (err, result, fields) {
		if (err) throw err;
		res.send(result)
	})
});

app.get('/subDevListType', function(req, res){
	var listKey= req.query.listKey;
	var subKey= req.query.subKey;
	var conType= req.query.conType;
	connection.query('SELECT l.id, l.datecreated, l.category, l.subcategory, l.title, l.link, l.challenge, l.description, l.filter, COUNT(v.linkid) AS votes FROM Links l INNER JOIN Votes v ON l.id = v.linkid WHERE l.category=? AND l.subcategory=? AND l.filter =? GROUP BY l.id ORDER BY votes DESC LIMIT 3;', [listKey,subKey,conType] ,function (err, result, fields) {
		if (err) throw err;
		res.send(result)
	})
});

app.post('/addLink', function(req, res){
	//UPDATED SINCE AXIOS, used to be just req.body
	var plan = JSON.parse(req.body.finForm);
	var curTime = Math.floor(Date.now() / 1000)

	connection.query('SELECT MAX(id) AS idx FROM Links;', function (err, result, fields) {
		if (err) throw err;
		var linkCount = result[0].idx;
		var link = {id: linkCount+1, datecreated: curTime, category: plan.category, subcategory: plan.subcat, title: plan.title, link: plan.link, challenge: plan.radio1, description: plan.desc, filter: plan.radio2};
		connection.query('INSERT INTO Links SET ?', link,  function (err, result, fields) {
			if (err) throw err;
			linkCount++;
			var vote = {linkid: linkCount, timeVoted: curTime, voteNumber: 1}
			connection.query('INSERT INTO Votes SET ?', vote,  function (err, result, fields) {
				if (err) throw err;
				link['votes'] = 1;
				res.send(link);
			});
		});
	})
})

//update vote count in userplans
app.post('/addVote', function(req, res){
	var vals = JSON.parse(req.body.vals);
	var uniqueid= vals.id;
	var count = vals.votes
	var curTime = Math.floor(Date.now() / 1000)
	//Need to make this an array with 2 elements to feed it in
	var vote = {linkid: uniqueid, timeVoted: curTime, voteNumber: count}
	connection.query('INSERT INTO Votes SET ?', vote,  function (err, result, fields) {
		if (err) throw err;
	});
	return res.sendStatus(200);
})

app.get('/testlinks', function(req, res){
	connection.query('SELECT * FROM Links', function (err, result, fields) {
		if (err) throw err;
		res.send(result);
	});
});

app.get('/testvotes', function(req, res){
	connection.query('SELECT * FROM Votes', function (err, result, fields) {
		if (err) throw err;
		res.send(result);
	});
});

// Tutorial Soup

app.get('/catOptions', function(req,res){
	var category=req.query.category
	res.send(categories[category]['subcat'])
})

app.get('/customTut', function(req,res){
	var category=req.query.category
	var subcat = req.query.subcat
	var choices = req.query.choices
	var allRes=[];
	connection.query('SELECT l.id, l.datecreated, l.category, l.subcategory, l.title, l.link, l.challenge, l.description, l.filter, COUNT(v.linkid) AS votes FROM Links l INNER JOIN Votes v ON l.id = v.linkid WHERE l.category=? AND l.subcategory=? AND l.filter IN (?) AND l.challenge="beginner" GROUP BY l.id ORDER BY votes DESC LIMIT 3;', [category,subcat,choices] ,function (err, result1, fields) {
		if (err) throw err;
		allRes.push(result1)
		connection.query('SELECT l.id, l.datecreated, l.category, l.subcategory, l.title, l.link, l.challenge, l.description, l.filter, COUNT(v.linkid) AS votes FROM Links l INNER JOIN Votes v ON l.id = v.linkid WHERE l.category=? AND l.subcategory=? AND l.filter IN (?) AND l.challenge="intermediate" GROUP BY l.id ORDER BY votes DESC LIMIT 2;', [category,subcat,choices] ,function (err, result2, fields) {
			allRes.push(result2)
			res.send(allRes)
		})
	})
})

/***** DEVGUIDE STUFF */

app.get('/objSend', function(req,res){
	res.send(categories)
})



if (isDeveloping) {
	var compiler = webpack(config);
	var middleware = webpackMiddleware(compiler, {
	publicPath: config.output.publicPath,
	contentBase: 'src',
	stats: {
		colors: true,
		hash: false,
		timings: true,
		chunks: false,
		chunkModules: false,
		modules: false
	}
	});

	//NEED TO FIGURE OUT: Wildcard router messes up images


	app.use(middleware);
	app.use(webpackHotMiddleware(compiler));
	app.get('/*', function response(req, res) {
		res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
		res.end();
	});
} else {
	app.get('/*', function response(req, res) {
		res.sendFile(path.join(__dirname, 'dist/index.html'));
	});
}


// viewed at http://localhost:8080
/*basicRouter.get('/', function(req, res) {
	console.log('in1')
	res.sendFile(path.join(__dirname + '/app/index.html'));
});

basicRouter.get('/devguide', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/devguide/index.html'));
});

basicRouter.get('/learnd3', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/learnd3/index.html'));
});

basicRouter.get('/tutorialsoup', function(req, res) {
	res.sendFile(path.join(__dirname + '/tutorialsoup/index.html'));
});

basicRouter.get('/*', function(req, res) {
	console.log('in2')
	res.sendFile(path.join(__dirname + '/index.html'));
});*/

app.use('/', basicRouter)

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
	console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});