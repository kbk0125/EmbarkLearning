var editor = ace.edit("editor");
editor.setTheme("ace/theme/clouds");
editor.session.setMode("ace/mode/javascript");
editor.setOption("showPrintMargin", false)


//this one splits the output into line by line
editor.session.on('change', function(delta) {
    var lines = editor.getSession().getDocument().getAllLines();
    let expressDecLine = '';
    let appDecLine = '';
    let midwareLine = '';
    let getLine = '';
    let listenLine = '';

    let requirements = [];


    for(var i = 0; i<lines.length; i++){
    	// get the name of the variable with require express, should be line 1
    	if(lines[i].indexOf("require") > -1 && expressDecLine.length == 0){
    		expressDecLine= lines[i].split(" ")[1];
    		$('.rightSect').eq(0).children('img').css('opacity', 1);
    		$('.rightSect').eq(0).children('.smErr').hide()
    	}
    	else if(expressDecLine.length == 0){
    		$('.rightSect').eq(0).children('img').css('opacity', 0.2);
    		$('.rightSect').eq(0).children('.smErr').show().text('You are missing require');
    	}

    	// this is the line where we declare app
    	if(lines[i].indexOf(expressDecLine+'()') > -1 && appDecLine.length == 0){
    		appDecLine= lines[i].split(" ")[1]+'.';
    		$('.rightSect').eq(0).children('img').css('opacity', 1);
    		$('.rightSect').eq(0).children('.smErr').hide()
    		//update first line on right
    		$('.rightSect').eq(0).find('.updatable').text(appDecLine);
    	}
    	else if(appDecLine.length == 0){
    		$('.rightSect').eq(0).children('img').css('opacity', 0.2);
    		$('.rightSect').eq(0).children('.smErr').show().text('Make sure your variable names match');
    	}

    	// figure out our route that we are validating
    	
    	if(lines[i].indexOf(appDecLine) > -1 && lines[i].indexOf('.use(') > -1 && lines[i].indexOf('function') > -1 && midwareLine.length == 0){
    		midwareLine= lines[i].split("'")[1];
    		$('.rightSect').eq(1).children('.smErr').hide();
    		$('.rightSect').eq(1).children('img').css('opacity', 1);
    	}
    	else if(midwareLine.length ==0){
    		$('.rightSect').eq(1).children('img').css('opacity', 0.2);
    		$('.rightSect').eq(1).children('.smErr').show().text('Check the way you have declared your middleware');
    	}

    	// get variable name of request parameters from the middleware
    	// putting both string requirements ensures that this only fires before we get to the params in the .get() line
    	if(lines[i].indexOf('req.') > -1 && midwareLine.length > 0 && getLine.length == 0){
    		let intermed = lines[i].trim().split(' ')[1];
    		
    		//this pushes the req parameters into an array so we can check if the statement is still correct later
    		requirements.push(intermed)
    		$('.rightSect').eq(1).find('.updatable:eq('+Number(requirements.length-1)+')').text(requirements[requirements.length-1]);
    	}

    	//this part matches whether the if statement matches the items above
        //there is a bug in here somewhere
    	if(lines[i].indexOf('if') > -1 && requirements.length && midwareLine.length > 0 && getLine.length == 0){
    		for (var j=0; j <requirements.length; j++){

    			if(lines[i].indexOf(requirements[j]) > -1){
    				$('.rightSect').eq(1).find('.updatable:eq('+j+')').text(requirements[j]);
    				$('.rightSect').eq(1).children('.smErr').hide();
    				$('.rightSect').eq(1).children('img').css('opacity', 1);
    			}
    			else{
    				$('.rightSect').eq(1).children('img').css('opacity', 0.2);
    				$('.rightSect').eq(1).children('.smErr').show().text('Check whether '+requirements[j]+' is in if statement');
    			}
    		}
    	}

    	// figure out our route that we are validating
    	if(lines[i].indexOf(appDecLine) > -1 && lines[i].indexOf('.get(') > -1 && lines[i].indexOf(midwareLine) > -1 && lines[i].indexOf('function') > -1 && getLine.length == 0){
    		getLine= lines[i].split("'")[1];
    		$('.rightSect').eq(2).children('.smErr').hide();
    		$('.rightSect').eq(2).children('img').css('opacity', 1);

    		//update line of text
    		let parameter = getLine.split(':')[1];
    		$('.rightSect').eq(2).find('.updatable').text(parameter);
    	}
    	else if(getLine.length ==0){
    		$('.rightSect').eq(2).children('img').css('opacity', 0.2);
    		$('.rightSect').eq(2).children('.smErr').show().text('Check your GET route');
    	}

    	// figure out our PORT
    	if(lines[i].indexOf(appDecLine) > -1 && lines[i].indexOf('.listen(') > -1 && listenLine.length == 0){
    		//https://stackoverflow.com/questions/650022/how-do-i-split-a-string-with-multiple-separators-in-javascript
    		listenLine= lines[i].split("(").join(',').split(')').join(',').split(',')[1];
    		$('.rightSect').eq(3).children('.smErr').hide();
    		$('.rightSect').eq(3).children('img').css('opacity', 1);

    		//update line of text
    		$('.rightSect').eq(3).find('.updatable').text(listenLine);
    	}
    	else if(listenLine.length ==0){
    		$('.rightSect').eq(3).children('img').css('opacity', 0.2);
    		$('.rightSect').eq(3).children('.smErr').show().text('Check the way you are setting up your port');
    	}


    }
});

//this one finds all errors, hides the right bar if they exist
editor.getSession().on("changeAnnotation", function(){
	var annot = editor.getSession().getAnnotations();
	var errCount = 0;
    for(var i = 0; i<annot.length; i++){
    	if(annot[i].type == "error"){
    		errCount++
    	}
    }

    if(errCount > 0){
		$('.rightSect').css('opacity', 0.2);
		$('#errmsg').fadeIn()
    }

    else{
    	$('.rightSect').css('opacity', 1);
    	$('#errmsg').hide()
    }

});

//ALL THE ABOVE SHOULD WORK WELL. Now just need to do tooltips depending on hover event or highlight
//probably should do hover events, a lot less precision from user. Then just need to figure out how the tooltip will be non entrusive
// will need to detect different components based on characters in string.

//need to load at body level because this is not initally in DOM
// added pointer-events auto to ace-line to fix default behavior
//either need to do it this way or look at each individual span

/*things I want to cover
Just fixed image path
*/

let imgObj = {
    'express': {
        img: '/img/expressplay/expresslogo.png',
        exp: 'Load the express module that you installed via NPM',
        load: 0
    },
    'express2': {
        img: '/img/expressplay/expresslogo.png',
        exp: 'Create an instance of an express application. Kind of like hiring a manager.',
        load: 0
    },
    'middleware': {
        img: '/img/expressplay/middleware.png',
        exp: 'Make sure the parameters pass all the tests before continuing',
        load: 1
    },
    'routing': {
        img: '/img/expressplay/routing.png',
        exp: 'This is the route we are validating',
        load: 1
    },
    'req': {
        img: '/img/expressplay/user.png',
        exp: 'This is data we need to consider due to a user request',
        load: 6
    },
    'res': {
        img: '/img/expressplay/waiter.png',
        exp: "This is what we respond to the user. It's kind of like a waiter's job",
        load: 6
    },
    'params': {
        img: '/img/expressplay/paramEx.png',
        exp: "The GET route is where we actually handle the user request with any parameters",
        load: 2
    },
    'send': {
        img: '/img/expressplay/finalprod.png',
        exp: "This is how you respond to a request. Kind of like sending a meal to customers.",
        load: 2
    },
    'address': {
        img: '/img/expressplay/finaddress.png',
        exp: "This is the port where your code will run. Try typing localhost:8080 into your browser to open.",
        load: 3
    },
    'listen': {
        img: '/img/expressplay/opensign.png',
        exp: "When a request comes from this port, your app will be ready to handle it.",
        load: 3
    }
} 


// NEED to fix tooltip positioning in this to react to screen size
function loadTooltip(conten, thisEl){
    
    $('#tooltip p').text(conten.exp)
    $('.rightSect').eq(conten.load).addClass('light')
    $('#tooltip img').attr('src', conten.img)

    // need to add this load line so it can get the positioning right
    $('#tooltip img').load(function(){
        let pos = $(thisEl).position();

        if(pos.left > 70){
            $('.arrow-down').removeClass('leftAl');
            $('#tooltip').fadeIn().position({
                of: $(thisEl),
                my: "bottom",
                at: "center top-25",
            })
        }
        else{
            $('.arrow-down').addClass('leftAl');
            $('#tooltip').fadeIn().position({
                of: $(thisEl),
                my: "left-22 bottom",
                at: "center top-25",
            })
        }
    })
}


$('body').on('mouseover', '.ace_line span', function(){
    let thisText = $(this).text();
    let fullLine = $(this).parent().text();
    //let fullLine = $(this).parent().text().trim().split(" ");

    if(fullLine.indexOf('require') > -1 && fullLine.indexOf("'express'") > -1){
        loadTooltip(imgObj['express'], this)
    }

    else if(fullLine.indexOf('()') > -1 && fullLine.indexOf("const") > -1){
        loadTooltip(imgObj['express2'], this)
    }

    else if(thisText.indexOf('use') > -1 && fullLine.indexOf("/") > -1){
        loadTooltip(imgObj['middleware'], this)
    }

    else if(thisText.indexOf('/') > -1 && thisText.indexOf(":") == -1){
        loadTooltip(imgObj['routing'], this)
    }

    else if(thisText.indexOf('req') > -1 && fullLine.indexOf("function") > -1){
        loadTooltip(imgObj['req'], this)
    }

    else if(thisText.indexOf('res') > -1 && fullLine.indexOf("function") > -1){
        loadTooltip(imgObj['res'], this)
    }

    else if(thisText.indexOf('/') > -1 && thisText.indexOf(":") > -1){
        loadTooltip(imgObj['params'], this)
    }

    else if(thisText.indexOf('send') > -1 && fullLine.indexOf("res") > -1){
        loadTooltip(imgObj['send'], this)
    }

    else if(isNaN(thisText) == false && fullLine.indexOf("listen") > -1){
        loadTooltip(imgObj['address'], this)
    }

    else if(thisText.indexOf('listen') > -1){
        loadTooltip(imgObj['listen'], this)
    }
})

$('body').on('mouseleave', '.ace_line', function(){
    $('.rightSect').removeClass('light');
    $('#tooltip').hide();
});

editor.session.selection.on('changeCursor', function() {
    $('.rightSect').removeClass('light');
    $('#tooltip').hide();
})