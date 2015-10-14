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

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(__dirname + '/public'));

app.get('/planList', function(req, res){
	var listKey= req.query.listKey;
	if(listKey in userPlans){
		//push all the arrays in that bucket so they can be listed for user
		for(var i=0; i<userPlans[listKey].length; i++){
			res.json(userPlans[listKey][i]);
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
	//Do not count the category, three items in header and number of upvotes, and unique id
	var arrLength= Object.keys(newPlan).length -6
	//Add to the array each of the appropriate fields for each category
	for(var i=1; i<=(arrLength/4); i++){
		planData.push(newPlan['radio'+i], newPlan['name['+i+']'], newPlan['link['+i+']'], newPlan['desc['+i+']']);
	}

	//finally, add the number of upvotes as last array item
	planData.push(req.body.upvotes);
	//initialize category if it does not already exist
	if (!userPlans[catKey]) {
		userPlans[catKey] = [];
	}
	//unique identifier that is the key, in the array 
	planData.push(userPlans[catKey].length)
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
	return res.sendStatus(200);
})

app.use('/', basicRouter)

app.listen(8080);