var express = require('express');
var app = express();
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
var Xray = require('x-ray');
var x = Xray();
//var morgan = require('morgan');

var isDeveloping = process.env.NODE_ENV !== 'production';
var port = isDeveloping ? 8080 : process.env.PORT;


// This is to fix the the Stormpath thing so that we can create a user NEED TO REVIEW WHAT IT DID
//Now need to fix POSTs due to new format
//And need to figure out Social Login
app.use(bodyParser.urlencoded({extended:false}));
app.use(require('serve-favicon')(__dirname+'/public/img/favicon.ico'));


//http://stackoverflow.com/questions/4878756/javascript-how-to-capitalize-first-letter-of-each-word-like-a-2-word-city
function toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}



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

app.get('/awesome', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/awesome/index.html'));
});

app.get('/forloopfactory', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/forloopfactory/index.html'));
});

app.get('/flexboxroadtrip', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/flexboxroadtrip/index.html'));
});

app.get('/d3garden', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/d3garden/index.html'));
});

app.get('/guides', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/guides/index.html'));
});

app.get('/csssundae', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/csssundae/index.html'));
});

app.get('/cssundae', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/csssundae/index.html'));
});

app.get('/learnd3', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/learnd3/index.html'));
});

app.get('/tutorialsoup', function(req, res) {
	res.sendFile(path.join(__dirname + '/tutorialsoup/index.html'));
});

app.get('/jsconstruction', function(req, res) {
	res.sendFile(path.join(__dirname + '/jsconstruction/index.html'));
});


//Finally figured out this fix
//https://expressjs.com/en/api.html#res.redirect
app.get('/jsconstruction*', function(req, res) {
	res.redirect('/jsconstruction');
});



app.get('/testPath2', function (req,res){
	//Grabs all Li elements and links, li for structure, a@href for linking to the actual sites
	x('https://github.com/sindresorhus/awesome/blob/master/readme.md', '.entry-content', [{
		items: x('ul', [['li']]),
		links: x('ul', [['a@href']])
	}])(function(err, obj) {

		//all encompassed in finjson, which organizes these
		var finjson= {
			'name': 'AllAwesome',
			'children':[]
		}
		var origEntries=[];
		//First list of items from page, should be 18 outer categories
		var totalNum= obj[0].items[1].length
		//need to add 2 since the first 2 in object are not link lists
		for(var i=2; i< totalNum+2; i++){
			var name = obj[0].items[1][i-2]
			origEntries.push({'label':name, 'value':name.replace(/[\. ,:-]+/g, "")})
			//an array to organize each category
			var nextArr={
				'name': name,
				'uniq':name.replace(/[\. ,:-]+/g, ""),
				'children': []
			}

			var len=obj[0].items[i].length

			//now we iterate through the items in each segment
			for(var j=0; j< len; j++){
				//console.log(j)
				//console.log(obj[0].items[i][j])
				var entry={}
				// if the line has a new line character in it, in other words, it has subcategories. This is why this is so complex.
				if(obj[0].items[i][j].indexOf('\n') > -1){

					//console.log(obj[0].items[i][j])
					var newVar=obj[0].items[i][j].split('\n')
					//console.log(newVar)
					entry.name=newVar[0]
					entry.uniq=newVar[0].replace(/[\. ,:-]+/g, "");

					origEntries.push({'label':newVar[0], 'value':newVar[0].replace(/[\. ,:-]+/g, ""), 'topParent': name.replace(/[\. ,:-]+/g, "")})
					entry.link=obj[0].links[i][j]
					entry.children = [{
						'name': 'General '+newVar[0],
						'link':obj[0].links[i][j]
					}]
					//start at 1 so we do not repeat the same main entry
					var negCount=0;
					// split turns all the new lines into an array, need to sort through this
					for(var k=1; k < newVar.length; k++){
						var smEntry={}
						// do not count the entries that are blank
						if(newVar[k].length > 0){
							var newK= k-negCount

							//console.log(newK)
							var newLink=obj[0].links[i+1][newK-1]

							smEntry.name=newVar[k].split(' - ')[0]
							smEntry.uniq=newVar[k].replace(/[\. ,:-]+/g, "");

							origEntries.push({'label':newVar[k], 'value':newVar[k].replace(/[\. ,:-]+/g, ""), 'topParent': name.replace(/[\. ,:-]+/g, ""), 'nearParent': newVar[0].replace(/[\. ,:-]+/g, "")})
							smEntry.link= newLink
							// great, now we have a sub entry
							entry.children.push(smEntry)
							//remove the duplicates from the remainder of the array
							obj[0].items[i].splice(j+1,1)
							obj[0].links[i].splice(j+1,1)
							len--
							//console.log(obj[0].items[i][j+1])
						}
						else
							negCount++
					}
					// remove more duplicates from the array.
					obj[0].items.splice(i+1,1)
					obj[0].links.splice(i+1,1)
				}
				else {
					entry.name=obj[0].items[i][j].split(' - ')[0]
					entry.uniq=obj[0].items[i][j].replace(/[\. ,:-]+/g, "");

					origEntries.push({'label':obj[0].items[i][j], 'value':obj[0].items[i][j].replace(/[\. ,:-]+/g, ""), 'topParent': name.replace(/[\. ,:-]+/g, "")})
					entry.link=obj[0].links[i][j]
				}
				nextArr['children'].push(entry)
			}
			finjson['children'].push(nextArr)
		}
		//console.log(obj[0].links) // Google
		//console.log(obj[0].items)
		res.send([origEntries,finjson])
	})
})

app.get('/specRepo', function (req,res){
	//Grabs all Li elements and links, li for structure, a@href for linking to the actual sites
	
	//x('https://github.com/enaqx/awesome-react/blob/master/README.md', '.entry-content', [{
	//x('https://github.com/vinta/awesome-python/blob/master/README.md', '.entry-content', [{
	x('https://github.com/sorrycc/awesome-javascript/blob/master/README.md', '.entry-content', [{
		items: x('ul', [['li']]),
		links: x('ul', [['a@href']]),
		//h2list: ['h2'],
		//h3list: ['h3'],
		//h4list: ['h4'],
		//h5list: ['h5'],
		anchors: ['a.anchor@href']
	}])(function(err, obj) {
		if (err) throw err;

		
		//ALL UNIVERSAL EMPTY THINGS HERE
		//all encompassed in finjson, which organizes these
		var finjson= {
			'name': 'OneRepo',
			'children':[]
		}
		var origEntries=[];
		var totalNum= obj[0].items[0].length
		var cliff=6
		//End Empty Things


		for(var i=0; i<totalNum; i++){

			//Create Empty things at next level
			var entry = {
				children : [],
				origChild: false
			}
			//End create empty things at next level

			// if the line has a new line character in it, in other words, it has subcategories. This is why this is so complex.
			if(obj[0].items[0][i].indexOf('\n') > -1){
				//cut off the trailing /n character
				var newVar=obj[0].items[0][i].split('\n').slice(0, -1)


				//Create Entry and other default things
				entry.name=newVar[0]
				entry.uniq=newVar[0].replace(/[\. ,:-]+/g, "");
				entry.children = [];
				origEntries.push({'label':newVar[0], 'value':newVar[0].replace(/[\. ,:-]+/g, "")})
				//End create entry and other defaults

				//Start create empty items
				var countLevel =0;
				var negCount=0;
				var splitLength = 0;
				//End create empty items

				//Make sure we do not get the first, top level category since we already did that in lines above
				for(var j=1; j< newVar.length; j++){
					
					//Start Empty things
					var smEntry ={
						children: []
					}
					//know where to put the entries in which buckets
					var keyLength= entry.children.length
					//End Empty things

					

					if(newVar[j].length > 0){

						smEntry.name=newVar[j].split(' - ')[0]
						smEntry.uniq=newVar[j].replace(/[\. ,:-]+/g, "");
						totalNum--

						// If the next item in array has a line break, we know this is time to create a new category
						if(obj[0].items[0][i+1].indexOf('\n') > -1){

							//This is how many children the entry has so we can cut off
							//-3 for /n spaces
							smEntry.origChild= true;
							splitLength=obj[0].items[0][i+1].split('\n').slice(0, -1).length-3;
							entry.children.push(smEntry)
							countLevel++
							obj[0].items[0].splice(i+1, 1)
							obj[0].items.splice(i+1, 1)
							obj[0].links[0].splice(i+1, 1)
							obj[0].links.splice(i+1, 1)

							//in case the number of li elements does not match the number of sections, this provides a failsafe
							cliff= Number(12 +(j-negCount) - (countLevel))
							//console.log(cliff)
							//console.log(obj[0].items[12 +(j-negCount) - (countLevel)])
						}
						else {
							if(countLevel ==0){
								//if it is base level, just stick it in
								entry.children.push(smEntry)
							}
							else{
								//this measures how many have already been put in there, so that they do not all go there
								var childrenLength=entry.children[keyLength-1].children.length
								if(childrenLength<splitLength)
									entry.children[keyLength-1].children.push(smEntry)
								else{
									//reset level count
									splitLength=0
									entry.children.push(smEntry)
								}
							}
							obj[0].items[0].splice(i+1, 1)
							obj[0].links[0].splice(i+1, 1)

							cliff++
						}
					}
					else
						negCount++
				}
				

				//AT END
				//When we have a sublist, need to knock out next in array
				obj[0].items.splice(1, 1)
				obj[0].links.splice(1, 1)
			}
			else{

				//Create entry at top level
				entry.name=obj[0].items[0][i]
				entry.uniq=obj[0].items[0][i].replace(/[\. ,:-]+/g, "");
				origEntries.push({'label':obj[0].items[0][i], 'value':obj[0].items[0][i].replace(/[\. ,:-]+/g, "")})
				//End create at top level

			}
			finjson['children'].push(entry)
		}


		//Variables to prep for adding individual entries
		var topLvCount=0;
		var botLvCount=0;
		var latestMatch='';
		var testInc= 1;
		var childCount=0;
		var subLength=0;
		var errCount=0;

		var shortCodes=[];

		for(var a=0; a<obj[0].anchors.length; a++){
			var shortCode = obj[0].anchors[a].split('#')[1];
			var shortUniq= shortCode.replace('-', '')
			var finShort= shortUniq.substring(0,3).toLowerCase()
			shortCodes.push(finShort)
		}

		//THIS HAS BECOME A MESS OF IF STATEMENTS. NEEDS RETHINK. LAUNCH OTHER THING.

		//for(var k=1; k<obj[0].items.length; k++){
		for(var k=1; k<23; k++){
			//console.log(k)
			//default numbers
			var cliffT = finjson.children[topLvCount].children[botLvCount]
			var cliffT2 = finjson.children[topLvCount].children[botLvCount+1]
			var curItem = obj[0].items[k]
			var curLink= obj[0].links[k]
			var anchorT= obj[0].anchors[k].split('#')[1]
			var anchorT2= obj[0].anchors[k+testInc].split('#')[1]
			var anchorUniq= anchorT.replace('-', '')
			var anchorUniq2= anchorT2.replace('-', '')
			var anchorName= toTitleCase(anchorT.replace('-', ' '))
			var shortCliff= cliffT['uniq'].substring(0,3).toLowerCase()
			var shortCliff2= cliffT2['uniq'].substring(0,3).toLowerCase()
			var shortAnchor= anchorUniq.substring(0,3).toLowerCase()
			var shortAnchor2= anchorUniq2.substring(0,3).toLowerCase()


			//console.log(cliffT['uniq'])
			//console.log(anchorUniq)
			//console.log(shortItem)
			//console.log(shortAnchor)
			
			//console.log(cliffT['name'])

			for(var m=0; m<curItem.length; m++){
				var lilArray= {
					children: []
				}

				//Only grab first bullet, I am not going to be nesting another level for sake of sanity
				if(curItem[m].indexOf('\n') > -1){
					var subBul= curItem[m].split('\n')[0]
					lilArray.name= subBul.split(' - ')[0]
					lilArray.desc= subBul.split(' - ')[1]
					obj[0].items.splice(k+1,1)
					obj[0].links.splice(k+1,1)
				}
				else{
					lilArray.name= curItem[m].split(' - ')[0]
					lilArray.desc= curItem[m].split(' - ')[1]
					
				}

				lilArray.link= curLink[m]


				//STUCK on this. When there is multiple level of next, how to get items in correct bucket
				if(cliffT.origChild && childCount > 0){
					cliffT.children[childCount-1].children.push(lilArray)
				}
				else{
					cliffT.children.push(lilArray)
				}
			}

			if(cliffT2.origChild && childCount == 0){
				subLength = cliffT2.children.length
				console.log('Child Length: ' +subLength)
			}
			//Stuck on this, related to above
			if(cliffT.origChild && childCount < subLength){
				console.log('Subarray')
				childCount++
			}
			else if(cliffT.origChild && childCount >= subLength){
				//make sure our increment does not get away from us
				testInc--
				botLvCount++
			}
			else{
				//console.log('TopLv')
				childCount=0
			}

			var arrTest= shortCodes.indexOf(shortCliff2) > -1;

			if(arrTest){
				//If this level is still ongoing
				if(finjson.children[topLvCount].children[botLvCount+1]){
					console.log(shortCliff2)
					console.log(shortAnchor2)
					if(shortCliff2 !== shortAnchor2){
						latest= shortCliff
					}
					//Only increment if there is a change coming up
					else
						botLvCount++

					//This gets rid of an off by 1 error in an exceptionally hacky way
					if(shortCliff2 !== shortAnchor2 && shortCliff === shortAnchor){
						console.log('BEING INCREMENTED')
						testInc++
					}
				}
			}
			else{
				childCount++
				botLvCount++
			}

		}


		res.send([obj, finjson])
	})
})


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
	console.log(plan)

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
	connection.query('SELECT l.id, l.datecreated, l.category, l.subcategory, l.title, l.link, l.challenge, l.description, l.filter, COUNT(v.linkid) AS votes FROM Links l INNER JOIN Votes v ON l.id = v.linkid WHERE l.category=? AND l.subcategory=? AND l.filter IN (?) AND l.challenge="beginner" GROUP BY l.id ORDER BY votes DESC LIMIT 5;', [category,subcat,choices] ,function (err, result1, fields) {
		if (err) throw err;
		allRes.push(result1)
		connection.query('SELECT l.id, l.datecreated, l.category, l.subcategory, l.title, l.link, l.challenge, l.description, l.filter, COUNT(v.linkid) AS votes FROM Links l INNER JOIN Votes v ON l.id = v.linkid WHERE l.category=? AND l.subcategory=? AND l.filter IN (?) AND l.challenge="intermediate" GROUP BY l.id ORDER BY votes DESC LIMIT 3;', [category,subcat,choices] ,function (err, result2, fields) {
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
		noInfo:true,
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


	//app.use(middleware);
	//app.use(webpackHotMiddleware(compiler));
	app.get('*', function response(req, res) {
		//res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
		//res.end();
		res.sendFile(path.join(__dirname + '/public/guides/index.html'));
	});
} else {
	//app.use(express.static(__dirname + '/dist'));
	app.get('*', function response(req, res) {
		//res.sendFile(path.join(__dirname, 'dist/index.html'));
		res.sendFile(path.join(__dirname + '/public/guides/index.html'));
	});
}


console.log('PORT:' +port)
app.listen(port, '0.0.0.0', function onStart(err) {
	console.log('PORT:' +port)
  if (err) {
	console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
