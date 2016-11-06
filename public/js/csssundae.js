var pageCount= 0;

$('#topBar img').click(function(){
    window.location.reload()
})

$('.startbtn, .startChal').click(function(){
    $(this).parents('.intro').fadeOut();
})

$('.startChal').click(function(){
	pageCount=16
	history.pushState(null,null, '/csssundae/'+pageCount)
	$('.imgs').hide();
	$('.sideSect').hide();
	$('.practiceStart').show();
	$('.livingRoom').show()
	$('.showHTML').show()
})

$('.showETCenter').click(function(){
	$('.etSummary').show();
})

$('.hideEt').click(function(){
	//hide everything and reset style
	$('.livingRoom').children('.light').addClass('resetStyle');
	$('.entertainmentCtr').children('.tv, .stand').addClass('resetStyle');
	$('.entertainmentCtr').find('.book1, .book2').addClass('resetStyle');
})

function nextSide(prev){
    var par= $(prev).parents('.sideSect')
    $(par).hide();
    $(par).next().show()

    //update page History with HTMl History API
    pageCount++
    history.pushState(null,null, '/csssundae/'+pageCount)

    //hide the HTML snip if it is up
    $('.htmlSnip').hide()
}

function prevSide(prev){
    var par= $(prev).parents('.sideSect')
    $(par).hide();
    $(par).prev().show()

    //update page History with HTMl History API
    pageCount--
    history.pushState(null,null, '/csssundae/'+pageCount)

    //hide the HTML snip if it is up
    $('.htmlSnip').hide()
}

$('.begin, .next').click(function(){
    nextSide(this)
})

$('.backBtn').click(function(){
    prevSide(this)
})

$('.showHTML').click(function(){
	if(pageCount > 15)
		$('.htmlSnip2').show();
	else
		$('.htmlSnip').show();
})

$('.finalCone').click(function(){
	$('.firstImg').attr('src', '/img/csssundae/fullCone.png')
	$('.showHTML').show()
})

$('.glassReturn').click(function(){
	$('.firstImg').attr('src', '/img/csssundae/emptyglass.png')
})

//if wrong more than 3 times, show answer
var wrongCount=0;

//function checkInputs(arr, thisButton, start, end, inc, cb){

function checkInputs(arr, thisButton, answer){
	var counter = 0;
	for(var i=0; i< arr.length; i++){
		//see if specific input contains the appropriate property name
		var testVal1= $(arr[i][0]).val().indexOf(arr[i][1]) > -1;
		//see if specific input contains the appropriate property value
		var testVal2= $(arr[i][0]).val().indexOf(arr[i][2]) > -1;
		//check if line ends with semi colon
		var endSemi= $(arr[i][0]).val().substr(-1) === ";";
		// check if line has a semi-colon
		var midQ= $(arr[i][0]).val().indexOf(":") > -1;
		// make sure we save original err msg
		var origMsg= $(thisButton).siblings('.warn').text()

		// if it has both correct property name and value, and semi and colon are in there
		if(testVal1 && testVal2 && endSemi && midQ)
			counter++
		else if(!(endSemi && midQ)){
			$(thisButton).siblings('.warn').text('Do you have a colon and a semi-colon included?').show();
			wrongCount++;
		}
		else{
			$(thisButton).siblings('.warn').text(origMsg).show();
			wrongCount++;
		}

		//user has gotten it wrong three times or more
		if (wrongCount > 2)
			$(thisButton).siblings('.warn').text('The answer is- '+answer).show();
	}

	if(counter === arr.length){
		//if(cb)
		//	cb(start, end, inc)
		wrongCount=0;
		nextSide(thisButton)
	}
}

$('.valid1').click(function(){
	var correct= [['#height1','height','500px']]
	var finAnswer= 'height:500px;'
	checkInputs(correct, this, finAnswer)
	$('.rightBrdr').fadeIn();
	$('.rightLabel').fadeIn();
})

$('.valid2').click(function(){
	var correct= [['#height2','height', '100px']]
	var finAnswer= 'height:100px;'
	checkInputs(correct, this, finAnswer)
	$('.firstImg').attr('src', '/img/csssundae/coneStatic1.png')
	$('.rightBrdr').css('height', '120%')
	$('.rightLabel').css('bottom', '117%')
})

$('.valid3').click(function(){
	var correct= [['#rel1','position', 'relative']]
	var finAnswer= 'height:60%; position:relative;'
	checkInputs(correct, this, finAnswer)
	$('.glassBrdr').fadeIn();
	$('.glassLabel').fadeIn();
})

$('.valid4').click(function(){
	var correct= [['#rel2','height', '33.3%']]
	var finAnswer= 'height:33.3%; position:relative;'
	checkInputs(correct, this, finAnswer)
	$('.firstImg').attr('src', '/img/csssundae/coneStatic2.png')
})

$('.valid5').click(function(){
	var correct= [['#rel3','20%', 'right'], ['#rel4','20%', 'left'] ]
	var finAnswer= 'right:20%; And answer 2 is left:20%;'
	checkInputs(correct, this, finAnswer)
})

$('.showScoops').click(function(){
	$('.imgs').addClass('fat')
    $('.firstImg').attr('src', '/img/csssundae/threeStacks.png')
    $('.measurem').hide()
})

$('.valid6').click(function(){
	$('.imgs').removeClass('fat')
	$('.firstImg').attr('src', '/img/csssundae/coneStatic2.png')
	$('.measurem').show()
})

$('.valid7').click(function(){
	var correct= [['#fix1','0', 'top']]
	var finAnswer= 'position:fixed; top:0;'
	checkInputs(correct, this, finAnswer)
	$('.firstImg').attr('src', '/img/csssundae/coneStatic3.png')
	$('.rightBrdr').css('height', '105%')
	$('.rightLabel').css('bottom', '104%')
	$('.glassBrdr').css('height', '48%')
	$('.glassLabel').css('bottom', '46%')
})

$('.valid8').click(function(){
	var correct= [['#abs1','left', '50%']];
	var finAnswer= 'left:50%; top:0;';
	checkInputs(correct, this, finAnswer)
	$('.firstImg').attr('src', '/img/csssundae/coneStatic4.png')
	$('.rightBrdr').css('height', '100%')
	$('.rightLabel').css('bottom', '98%')
	$('.glassBrdr').css('height', '46%')
	$('.glassLabel').css('bottom', '44%')
})

$('.valid9').click(function(){
	var correct= [['#abs2','left', '5px'], ['#abs3','bottom', '15px'] ]
	var finAnswer= 'left:5px;top:5px;  And answer 2 is bottom:15px;left:2px;'
	checkInputs(correct, this, finAnswer)
	$('.firstImg').attr('src', '/img/csssundae/fullCone.png')
})

function answerTester(inputs, els){
	var val1= $(inputs[0]).val()
	var val2= $(inputs[1]).val()
	// split along both ; and : using regex
	var splitAns= val1.split(/[:;]+/);
	console.log(splitAns)

	//reset styles
	$(els[0]).removeAttr('style')
	$(els[1]).removeAttr('style')

	for(var j=0; j< splitAns.length; j++){
		if(splitAns[j].indexOf('position') > -1){
			$(els[0]).css('position', splitAns[j+1].trim()).css('display', 'block')
		}

		var numMatch= splitAns[j].match(/\d+/g)
		if (numMatch != null) {
			console.log(splitAns[j])
			console.log(splitAns[j-1])
			$(els[0]).css(splitAns[j-1].trim(), splitAns[j]).css('display', 'block')
		}
	}

	var splitAns2= val2.split(/[:;]+/);
	for(var j=0; j< splitAns2.length; j++){
		if(splitAns2[j].indexOf('position') > -1){
			console.log('secondEl shown')
			$(els[1]).css('position', splitAns2[j+1]).css('display', 'block')
		}

		var numMatch= splitAns2[j].match(/\d+/g)
		if (numMatch != null) {
			$(els[1]).css(splitAns2[j-1].trim(), splitAns2[j])
		}
	}
}

$('.test1').click(function(){
	var inputs= ['#inter1', '#inter2']
	var els= ['.light1', '.light2']
	answerTester(inputs,els)
})

$('.intervalid1').click(function(){
	var correct= [['#inter1','20%', 'left'], ['#inter2','20%', 'right'] ]
	var finAnswer= 'position:absolute; left:20%; And answer 2 is position:absolute; right:20%;'
	checkInputs(correct, this, finAnswer)
	$('.test1').trigger('click');
})

$('.showETCEnter').click(function(){
	//$('.entertainmentCtr').removeClass('resetStyle')
	$('.entertainmentCtr').css('border', '1px solid #ccc')
	//$('.entertainmentCtr').children().hide()
})

$('.test2').click(function(){
	var inputs= ['#inter3', '#inter4']
	var els= ['.tv', '.stand']
	answerTester(inputs,els)
})

$('.intervalid2').click(function(){
	var correct= [['#inter3','60%', 'width'], ['#inter4','100%', 'width'] ]
	var finAnswer= 'position:static; width:60%; And answer 2 is position:static; width:100%;'
	checkInputs(correct, this, finAnswer)
	$('.test2').trigger('click');
})

$('.test3').click(function(){
	var inputs= ['#inter5', '#inter6']
	var els= ['.book1', '.book2']
	answerTester(inputs,els)
})

$('.intervalid3').click(function(){
	var correct= [['#inter5','3%', 'left'], ['#inter6','relative', 'position'] ]
	var finAnswer= 'position:relative; left:30%; And answer 2 is position:relative; right:0;'
	checkInputs(correct, this, finAnswer)
	$('.test3').trigger('click');
})