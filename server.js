var express = require('express');
var app = express();
var path = require('path');
var basicRouter = express.Router();
var bodyParser = require('body-parser')
var parseUrlencoded= bodyParser.urlencoded({extended:false});
var userPlans={};

// viewed at http://localhost:8080
basicRouter.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.use(express.static(__dirname + '/public'));

app.get('/planList', parseUrlencoded, function(req, res){
	var listKey= req.query.listKey;
	for(var key in userPlans){
		//for every time a key contains the category we are requesting, add it to user list so they have all the appropriate stuff at one time
		if (key.indexOf(listKey) > -1){
			res.json(userPlans[key]);
		}
	}
	res.end();
});

app.post('/addPlan', parseUrlencoded, function(req, res){
	var newPlan = req.body;
	var planData=[];
	//what category to use to bucket it
	var catKey= req.body.category;

	//Overall header for the new plan
	planData.push(req.body.title, req.body.firstname, req.body.advice)
	//Do not count the category, three items in header and number of upvotes, and unique id
	var arrLength= Object.keys(newPlan).length -6
	//Add to the array each of the appropriate fields for each category
	for(var i=1; i<=(arrLength/4); i++){
		planData.push(newPlan['radio'+i], newPlan['name['+i+']'], newPlan['link['+i+']'], newPlan['desc['+i+']']);
	}

	//finally, add the number of upvotes as last array item
	planData.push(req.body.upvotes);
	//unique identifier that is the key, in the array
	planData.push(catKey+Object.keys(userPlans).length)
	//Add it to the universal object so that we can access it again
	userPlans[catKey+Object.keys(userPlans).length]=planData;
	//console.log(planData);
	res.send(planData);
})

//update vote count in userplans
app.post('/addVote', parseUrlencoded, function(req, res){
	var uniqueid= req.body.myid;
	var voteCount = req.body.votecount;
	var voteCountIndex= userPlans[uniqueid].length-2;
	var fullArray=userPlans[uniqueid];
	fullArray[voteCountIndex]= voteCount;
})

app.use('/', basicRouter)

app.listen(8080);