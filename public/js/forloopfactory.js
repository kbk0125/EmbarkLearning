var robots = [ {color:'blue' , orient:'back'}, { color:'purple' , orient:'front'}, { color:'red' , orient:'front'}, {color:'green' , orient:'front'}, { color:'blue' , orient:'front'}, {color:'blue' , orient:'back'}, { color:'purple' , orient:'front'}, { color:'red' , orient:'front'}, {color:'green' , orient:'front'}, { color:'blue' , orient:'front'} ]

function nextSide(prev){
    var par= $(prev).parents('.sideSect')
    $(par).hide();
    $(par).next().show()
}

function prevSide(prev){
    var par= $(prev).parents('.sideSect')
    $(par).hide();
    $(par).prev().show()
}


//Potentially hacky fix for hard to place element
function setResDiv(){
	$( ".resultDiv" ).position({
		my: "left+4% top",
		at: "left bottom",
		of: ".bottomBelt"
	});
}

setResDiv()	

$(window).resize(function() {
	setResDiv();
})

function checkInputs(arr, thisButton, start, end, inc, cb){
	var counter = 0;
	for(var i=0; i< arr.length; i++){
		if($(arr[i][0]).val().indexOf(arr[i][1]) > -1)
			counter++
		else
			$(thisButton).siblings('.warn').show();
	}

	if(counter === arr.length){
		if(cb)
			cb(start, end, inc)
		nextSide(thisButton)
	}
}

function checkInputsArr(arr, thisButton, numArray, inc, cb){
	var counter = 0;
	for(var i=0; i< arr.length; i++){
		if($(arr[i][0]).val().indexOf(arr[i][1]) > -1)
			counter++
		else
			$(thisButton).siblings('.warn').show();
	}

	if(counter === arr.length){
		if(cb){
			for(var i=0; i< numArray.length; i++){
				cb(numArray[i],numArray[i]+1,1)
			}
		}
		nextSide(thisButton)
	}
}

function hideRobots(startNum, endNum, inc){
	$('.robotDiv').css('width', '55.5%')
	refreshTopBelt()
	$('.oneBot').children('p').css('opacity', '1')
	$('.greenBot').appendTo($('.robotDiv'))
	$('.oneBot').css('opacity', 0.2)
	$('.greenBot').css('opacity', 1)
}

function moveRobots(startNum, endNum, inc){
	refreshTopBelt()
	var i = startNum;
	var j = endNum;
	//should be 10, but adjust for eq()
	var fullLength= 9;
	// USING RECURSION
	(function dropNext () {
		if(i < j){
			//start from the end
			$('.topBelt').children('img').removeClass('pause')
			var nextBot= $( ".robotDiv" ).children('.oneBot').eq(fullLength-i);
			$( ".robotDiv" ).animate({ "right": "+=5.6%" }, function(){
				$('.topBelt').children('img').addClass('pause')
				$(nextBot).fadeOut('fast',function(){
					$('.bottomBelt').children('img').removeClass('pause')
					$('.smoke').show('drop', {direction: 'down'}).hide('drop', {direction: 'up'}, function(){
						$('.bottomBelt').children('img').addClass('pause')
						//need to clone it in order to be able to retrieve again, just change display
						$(nextBot.clone()).appendTo($('.newRobots')).show('drop', 'fast').css('display', 'inline-block');
						//this is the recursion
						i+=inc
						dropNext()
					})
				})
			});
		}
	}) ();
}

function moveParts(one, two, three){
	var i=0;

	(function dropNext () {
		if(i < 4){
			$('.topBelt').children('img').removeClass('pause')
			var nextBot= $( ".robotDiv" ).children('.onePart').eq(i);
			$( ".robotDiv" ).animate({ "right": "+=5%" }, function(){
				$('.topBelt').children('img').addClass('pause')
				$(nextBot).fadeOut('fast',function(){
					$('.smoke').show('drop', {direction: 'down'}).hide('drop', {direction: 'up'}, function(){
						i++
						dropNext()
					})
				})
			});
		}
		else{
			var finalBot= $( ".robotDiv" ).children('.oneBot').eq(5)
			$(finalBot).children('p').css('opacity', '0')
			$(finalBot.clone()).appendTo($('.newRobots')).show('drop', 'fast').css('display', 'inline-block');
		}
	}) ();
}

function refreshTopBelt(){
	$('.robotDiv').css('right', '22%')
	$('.robotDiv').children('.oneBot').show().css('display', 'inline-block')
	$('.newRobots').html('')
}

function prepTopBelt(one,two,three){
	$('.robotDiv').css('width', '25.5%')
	$('.robotDiv').css('right', '51%')
	$('.newRobots').html('')
	$('.oneBot').not('.first').hide()
	$('.onePart').show()
}

$('.backBtn').click(function(){
    prevSide(this)
})

$('#topBar img').click(function(){
    window.location.reload()
})

$('.startbtn').click(function(){
    $(this).parents('.intro').fadeOut();
})

$('.normAdv').click(function(){
    nextSide(this)
})

$('.track1Start').click(function(){
	nextSide(this)
})

$('.track2Start').click(function(){
	var par= $(this).parents('.sideSect')
    $(par).hide();
    $('.track2').show()
})

$('.valid1').click(function(){
	var correct= [['#arr1','robots[6]']]
	checkInputs(correct, this)
})

$('.valid2').click(function(){
	var correct= [ ['#for1','var i'], ['#for2','robots.length'], ['#for3','i++'] ]
	checkInputs(correct, this, 0, 10, 1, moveRobots)
})

$('.valid3').click(function(){
	var correct= [ ['#for4','conveyor2'], ['#for5','.push('] ]
	checkInputs(correct, this, 0, 10, 1, moveRobots)
})

$('.runTest1').click(function(){
	moveRobots(5,10,1)
})

$('.valid4').click(function(){
	var correct= [ ['#inc1','2'] ]
	checkInputs(correct, this, 2, 10, 1, moveRobots)
})

$('.runTest2').click(function(){
	moveRobots(0,4,1)
})

$('.valid5').click(function(){
	var correct= [ ['#inc2','2'] ]
	checkInputs(correct, this, 0, 2, 1, moveRobots)
})

$('.runTest3').click(function(){
	moveRobots(0,10,2)
})

$('.valid6').click(function(){
	var correct= [ ['#inc3','3'] ]
	checkInputs(correct, this, 0, 10, 3, moveRobots)
})

$('.valid7').click(function(){
	var correct= [ ['#obj1','purple'] ]
	var matches= [1,6]
	checkInputsArr(correct, this, matches, 1, moveRobots)
})

$('.valid8').click(function(){
	var correct= [ ['#obj2','back'] ]
	var matches= [0,5]
	checkInputsArr(correct, this, matches, 1, moveRobots)
})

$('.valid9').click(function(){
	var correct= [ ['#each1','element'] ]
	checkInputs(correct, this, 0, 10, 1, moveRobots)
})

$('.valid10').click(function(){
	var correct= [ ['#each2','red'] ]
	var matches= [2,7]
	checkInputsArr(correct, this, matches, 1, moveRobots)
})

$('.mapStart').click(function(){
	moveRobots(0,10,1)
})

$('.mapvalid1').click(function(){
	var correct= [ ['#map1','conveyor2'], ['#map2','map'], ['#map3','return'] ]
	checkInputs(correct, this, 0, 10, 1, moveRobots)
})

$('.mapvalid2').click(function(){
	var correct= [ ['#map4','array2'], ['#map5','map'], ['#map6','green'] ]
	var matches= [3,8]
	checkInputsArr(correct, this, matches, 1, moveRobots)
})

$('.mapvalid3').click(function(){
	var correct= [ ['#map7','robotBody'], ['#map8','robotParts.map('], ['#map9','onePart'] ]
	checkInputs(correct, this, 0, 10, 1, prepTopBelt)
})

$('.mapvalid4').click(function(){
	var correct= [ ['#map10','element[0]'], ['#map11','return'] ]
	checkInputs(correct, this, 0, 10, 1, moveParts)
})

$('.mapvalid5').click(function(){
	var correct= [ ['#map12','greenBots'], ['#map13','green'] ]
	var matches= [3,8]
	checkInputsArr(correct, this, matches, 1, hideRobots)
})

$('.mapvalid6').click(function(){
	var correct= [ ['#map14','color'] ]
	checkInputs(correct, this, 0, 2, 1, moveRobots)
})

$('.mach').click(function(){
	prepTopBelt
	moveParts(0,10,1)
})