$('#topBar img').click(function(){
    window.location.reload()
})

$('.startbtn').click(function(){
    $(this).parents('.intro').fadeOut();
})

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

console.log('loaded')

$('.begin, .next').click(function(){
	console.log('nxt')
    nextSide(this)
})

$('.backBtn').click(function(){
    prevSide(this)
})

$('.finalCone').click(function(){
	$('.firstImg').attr('src', '/img/csssundae/fullCone.png')
})

$('.glassReturn').click(function(){
	$('.firstImg').attr('src', '/img/csssundae/emptyglass.png')
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

$('.valid1').click(function(){
	var correct= [['#height1','500px']]
	checkInputs(correct, this)
	$('.rightBrdr').fadeIn();
	$('.rightLabel').fadeIn();
})

$('.valid2').click(function(){
	var correct= [['#height2','100px']]
	checkInputs(correct, this)
	$('.firstImg').attr('src', '/img/csssundae/coneStatic1.png')
	$('.rightBrdr').css('height', '120%')
	$('.rightLabel').css('bottom', '115%')
})

$('.valid3').click(function(){
	var correct= [['#rel1','relative']]
	checkInputs(correct, this)
	$('.glassBrdr').fadeIn();
	$('.glassLabel').fadeIn();
})

$('.valid4').click(function(){
	var correct= [['#rel2','33.3%']]
	checkInputs(correct, this)
	$('.firstImg').attr('src', '/img/csssundae/coneStatic2.png')
})

$('.valid5').click(function(){
	var correct= [['#rel3','right'], ['#rel4','left'] ]
	checkInputs(correct, this)
})

$('.showScoops').click(function(){
	$('.imgs').addClass('fat')
    $('.firstImg').attr('src', '/img/csssundae/threeStacks.png')
})

$('.valid6').click(function(){
	$('.imgs').removeClass('fat')
	$('.firstImg').attr('src', '/img/csssundae/coneStatic2.png')
})

$('.valid7').click(function(){
	var correct= [['#fix1','top']]
	checkInputs(correct, this)
	$('.firstImg').attr('src', '/img/csssundae/coneStatic3.png')
	$('.rightBrdr').css('height', '100%')
	$('.rightLabel').css('bottom', '95%')
	$('.glassBrdr').css('height', '60%')
	$('.glassLabel').css('bottom', '55%')
})

$('.valid8').click(function(){
	var correct= [['#abs1','50%']]
	checkInputs(correct, this)
	$('.firstImg').attr('src', '/img/csssundae/coneStatic4.png')
	$('.rightBrdr').css('height', '100%')
	$('.rightLabel').css('bottom', '95%')
	$('.glassBrdr').css('height', '60%')
	$('.glassLabel').css('bottom', '55%')
})

$('.valid9').click(function(){
	var correct= [['#abs2','5px'], ['#abs3','15px'] ]
	checkInputs(correct, this)
	$('.firstImg').attr('src', '/img/csssundae/fullCone.png')
})