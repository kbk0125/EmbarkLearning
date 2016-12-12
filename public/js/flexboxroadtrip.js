var pageCount= 0;

//global boolean that tracks if we are showing 5 divs now or 3
var all5= false;

$('#topBar img').click(function(){
    window.location.reload()
})

//make sure this resizes appropriately when it resizes
$(window).resize(function(){
    var imgHeight= $('#main img').height()
    $('.stops').height(imgHeight*0.75)
})

$('.startbtn, .startChal').click(function(){
    $(this).parents('.intro').fadeOut();
    var imgHeight= $('#main img').height()
    $('.stops').height(imgHeight*0.75)
})

$('.startChal').click(function(){
    pageCount=19
    history.pushState(null,null, '/flexboxroadtrip/'+pageCount)
    $('.sideSect').hide();
    $('.practiceStart').show();

    $('.origStop').show()
    $('.stops').css('justify-content', 'space-between')
})

function nextSide(prev){
    var par= $(prev).parents('.sideSect')
    $(par).hide();
    $(par).next().show()

    //update page History with HTMl History API
    pageCount++
    history.pushState(null,null, '/flexboxroadtrip/'+pageCount)

    //hide the HTML snip if it is up
    $('.htmlSnip').hide()
}

function prevSide(prev){
    var par= $(prev).parents('.sideSect')
    $(par).hide();
    $(par).prev().show()

    //update page History with HTMl History API
    pageCount--
    history.pushState(null,null, '/flexboxroadtrip/'+pageCount)

    //hide the HTML snip if it is up
    $('.htmlSnip').hide()
}

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
        //  cb(start, end, inc)
        wrongCount=0;
        nextSide(thisButton)
    }
}

//need to use this
function lightUpBox(boxes){
    $('.lightUp').children().css('display', 'inline-block')
    $('.lightUp').children().css('backgroundColor', 'none')

    for(var i=0; i<boxes.length; i++){
        $('.lightUp').children().eq(boxes[i]).css('backgroundColor', 'red')
        setTimeout(function() { $(".lightUp").children().fadeOut(); }, 3000);
    }
}

function resetStops(){
    $('.stops').children().css('align-self', 'auto')
}

$('.begin, .next').click(function(){

    nextSide(this)

})

$('.backBtn').click(function(){
    prevSide(this)
})


//NEED TO REVIEW AND UPDATE
$('.showHTML').click(function(){
	if(pageCount < 6)
        $('.snip1').toggle();
    else if(pageCount>=6 && pageCount < 8)
        $('.snip2').toggle();
    else
        $('.snip3').toggle();
})

$('.codeSub').click(function(){
	$('.backgroundImg').toggle();
	$('.topL').toggle();

	//NEEDS Review- will need to be adjusted later when I work in either 3 or 5 divs showing at a time
    if(all5){
        $('.stop').toggle();
        $('.sampleDiv').toggle();
    }
    else{
    	$('.origStop').toggle();
    	$('.origdiv').toggle();
    }
})

$('.showGrid').click(function(){
	$('.backgroundImg').addClass('interImg')
	$('.backgroundImg').attr('src', '/img/roadtrip/Ushighwaygrid.jpg')
	$('.roadPlot').hide()
})

$('.hideGrid').click(function(){
	$('.backgroundImg').removeClass('interImg')
	$('.backgroundImg').attr('src', '/img/roadtrip/blankUSmap3.svg')
	$('.roadPlot').show()

	$('.origStop').show()
})

$('.valid1').click(function(){
    var correct= [['#rel1','justify-content','center']]
    var finAnswer= 'justify-content:center;'
    checkInputs(correct, this, finAnswer)
    var newStr= $('#rel1').val().replace(/;/g, ":")
    var keyval = newStr.split(":")[1]
    var keyprop = newStr.split(":")[0]
    $('.stops').css('justify-content', keyval)
})

$('.valid2').click(function(){
    var correct= [['#rel2','justify-content','space-between']]
    var finAnswer= 'justify-content:space-between;'
    
    all5=true
    $('.stopType2').show()

    checkInputs(correct, this, finAnswer)
    var keyval = $('#rel2').val().split(':')[1]
    var keyprop = $('#rel2').val().split(':')[0]

    $('.stops').css('justify-content', keyval.split(';')[0])
})

$('.vertTrip').click(function(){
    $('.stops').css('justify-content', 'flex-start')
    $('.stops').css('flex-direction', 'column')

    all5=false
    $('.stopType2').hide()
})

$('.valid3').click(function(){
    var correct= [['#flex1','justify-content','space-between'], ['#flex1','flex-direction','column']]
    var finAnswer= 'flex-direction:column; justify-content:space-between;'

    checkInputs(correct, this, finAnswer)

    var newStr= $('#flex1').val().replace(/;/g, ":")
    var keyval1 = newStr.split(':')[1]
    var keyprop1= newStr.split(':')[0].trim()
    var keyval2 = newStr.split(':')[3]
    var keyprop2= newStr.split(':')[2].trim()

    $('.stops').css(keyprop1, keyval1)
    $('.stops').css(keyprop2, keyval2)
})

$('.valid4').click(function(){
    var correct= [['#flex2','flex-direction','column-reverse'], ['#flex2','justify-content','space-between']]
    var finAnswer= 'flex-direction:column-reverse; justify-content:space-between;'

    checkInputs(correct, this, finAnswer)

    var newStr= $('#flex2').val().replace(/;/g, ":")
    var keyval1 = newStr.split(':')[1]
    var keyprop1= newStr.split(':')[0].trim()
    var keyval2 = newStr.split(':')[3]
    var keyprop2= newStr.split(':')[2].trim()

    $('.stops').css(keyprop1, keyval1)
    $('.stops').css(keyprop2, keyval2)
})

$('.horizTrip').click(function(){
    $('.stops').css('justify-content', 'space-between')
    $('.stops').css('flex-direction', 'row')
    $('.stops').css('align-items', 'center')
})

$('.valid5').click(function(){
    var correct= [['#align1','flex-direction','row-reverse'], ['#align1','align-items','flex-end']]
    var finAnswer= 'flex-direction:row-reverse; align-items:flex-end;'

    checkInputs(correct, this, finAnswer)

    var newStr= $('#align1').val().replace(/;/g, ":")
    var keyval1 = newStr.split(':')[1]
    var keyprop1= newStr.split(':')[0].trim()
    var keyval2 = newStr.split(':')[3]
    var keyprop2= newStr.split(':')[2].trim()

    $('.stops').css(keyprop1, keyval1)
    $('.stops').css(keyprop2, keyval2)
})

$('.varyTrip').click(function(){
    $('.stops').css('justify-content', 'flex-start')
    $('.stops').css('flex-direction', 'row')
    $('.stops').css('align-items', 'flex-start')
    $('.origStop').eq(1).css('align-self', 'center')
    $('.origDiv').eq(1).css('align-self', 'center')
})

$('.valid6').click(function(){
    var correct= [['#detour1','align-items','center'], ['#detour2','align-self','flex-start']]
    var finAnswer= 'align items: center; And .chicagoRoadtrip has align-self:flex-start;'

    checkInputs(correct, this, finAnswer)

    var newStr= $('#detour1').val().replace(/;/g, ":")
    var newStr2= $('#detour2').val().replace(/;/g, ":")
    var keyval1 = newStr.split(':')[1]
    var keyprop1= newStr.split(':')[0]
    var keyval2 = newStr2.split(':')[1]
    var keyprop2= newStr2.split(':')[0]

    $('.stops').css(keyprop1, keyval1)
    $('.origDiv').eq(1).css(keyprop2, keyval2)
    $('.origStop').eq(1).css(keyprop2, keyval2)
})

$('.horizTrip2').click(function(){
    $('.stops').css('justify-content', 'flex-start')
    $('.stops').css('flex-direction', 'row')
    $('.stops').css('align-items', 'flex-start')
    $('.origDiv').eq(1).css('align-self', 'flex-start')
    $('.origStop').eq(1).css('align-self', 'flex-start')
})

$('.valid7').click(function(){
    var correct= [['#other1','order','-2'], ['#other2','order','-1']]
    var finAnswer= 'The value for denverVisit must be less than 0 but greater than San Fran visit'

    checkInputs(correct, this, finAnswer)

    var newStr= $('#other1').val().replace(/;/g, ":")
    var newStr2= $('#other2').val().replace(/;/g, ":")
    var keyval1 = newStr.split(':')[1]
    var keyprop1= newStr.split(':')[0]
    var keyval2 = newStr2.split(':')[1]
    var keyprop2= newStr2.split(':')[0]

    $('.origStop').eq(0).css(keyprop1, keyval1)
    $('.origDiv').eq(0).css(keyprop1, keyval1)
    $('.origStop').eq(2).css(keyprop2, keyval2)
    $('.origDiv').eq(2).css(keyprop2, keyval2)
})

$('.changeOrder').click(function(){
    $('.origStop').eq(0).css('order', '-2')
    $('.origDiv').eq(0).css('order', '-2')
    $('.origStop').eq(2).css('order', '-1')
    $('.origDiv').eq(2).css('order', '-1')
})

$('.chalvalid1').click(function(){
    var correct= [['#chal11','align-self','center'], ['#chal12','align-self','flex-end']]
    var finAnswer= 'align-self:center; Answer 2 is align-self: flex-end;'

    resetStops()
    checkInputs(correct, this, finAnswer)

    var newStr= $('#chal11').val().replace(/;/g, ":")
    var newStr2= $('#chal12').val().replace(/;/g, ":")
    var keyval1 = newStr.split(':')[1]
    var keyprop1= newStr.split(':')[0]
    var keyval2 = newStr2.split(':')[1]
    var keyprop2= newStr2.split(':')[0]

    $('.origStop').eq(1).css(keyprop1, keyval1)
    $('.origDiv').eq(1).css(keyprop1, keyval1)
    $('.origStop').eq(2).css(keyprop2, keyval2)
    $('.origDiv').eq(2).css(keyprop2, keyval2)
})

$('.hBox1').click(function(){
    lightUpBox([0,12,24])
})

$('.chalvalid2').click(function(){
    var correct= [['#chal21','align-items','center'], ['#chal21','flex-direction','column-reverse'], ['#chal22','align-self','flex-start']]
    var finAnswer= 'align-items:center; flex-direction:column-reverse; Answer 2 is align-self: flex-start;'

    resetStops()
    checkInputs(correct, this, finAnswer)

    var newStr= $('#chal21').val().replace(/;/g, ":")
    var newStr2= $('#chal22').val().replace(/;/g, ":")
    var keyval1 = newStr.split(':')[1]
    var keyprop1= newStr.split(':')[0].trim()
    var keyval2 = newStr.split(':')[3]
    var keyprop2= newStr.split(':')[2].trim()
    var keyval3 = newStr2.split(':')[1]
    var keyprop3= newStr2.split(':')[0]

    $('.stops').css(keyprop1, keyval1)
    $('.stops').css(keyprop2, keyval2)
    $('.origStop').eq(1).css(keyprop3, keyval3)
    $('.origDiv').eq(1).css(keyprop3, keyval3)
})

$('.hBox2').click(function(){
    lightUpBox([2,11,22])
})

$('.chalvalid3').click(function(){
    var correct= [['#chal31','align-items','flex-start'], ['#chal31','flex-direction','row-reverse'], ['#chal32','align-self','flex-end']]
    var finAnswer= 'align-items:flex-start; flex-direction:row-reverse; Answer 2 is align-self: flex-end;'

    resetStops()
    checkInputs(correct, this, finAnswer)

    var newStr= $('#chal31').val().replace(/;/g, ":")
    var newStr2= $('#chal32').val().replace(/;/g, ":")
    var keyval1 = newStr.split(':')[1]
    var keyprop1= newStr.split(':')[0].trim()
    var keyval2 = newStr.split(':')[3]
    var keyprop2= newStr.split(':')[2].trim()
    var keyval3 = newStr2.split(':')[1]
    var keyprop3= newStr2.split(':')[0]

    $('.stops').css(keyprop1, keyval1)
    $('.stops').css(keyprop2, keyval2)
    $('.origStop').eq(2).css(keyprop3, keyval3)
    $('.origDiv').eq(2).css(keyprop3, keyval3)
})

$('.hBox3').click(function(){
    lightUpBox([2,4,20])
})

$('.chalvalid4').click(function(){
    var correct= [['#chal41','justify-content','space-around'], ['#chal41','flex-direction','row-reverse'], ['#chal42','align-self','center']]
    var finAnswer= 'justify-content:space-around; flex-direction:row-reverse; Answer 2 is align-self: center;'

    resetStops()
    checkInputs(correct, this, finAnswer)

    var newStr= $('#chal41').val().replace(/;/g, ":")
    var newStr2= $('#chal42').val().replace(/;/g, ":")
    var keyval1 = newStr.split(':')[1]
    var keyprop1= newStr.split(':')[0].trim()
    var keyval2 = newStr.split(':')[3]
    var keyprop2= newStr.split(':')[2].trim()
    var keyval3 = newStr2.split(':')[1]
    var keyprop3= newStr2.split(':')[0]

    $('.stops').css(keyprop1, keyval1)
    $('.stops').css(keyprop2, keyval2)
    $('.origStop').eq(1).css(keyprop3, keyval3)
    $('.origDiv').eq(1).css(keyprop3, keyval3)
})

$('.hBox4').click(function(){
    lightUpBox([3,4,0,1,12])
})

$('.chalvalid5').click(function(){
    var correct= [['#chal51','justify-content','space-between'], ['#chal51','flex-direction','column-reverse'], ['#chal52','align-self','center']]
    var finAnswer= 'justify-content:space-between; flex-direction:column-reverse; Answer 2 is align-self: center;'

    resetStops()
    checkInputs(correct, this, finAnswer)

    var newStr= $('#chal51').val().replace(/;/g, ":")
    var newStr2= $('#chal52').val().replace(/;/g, ":")
    var keyval1 = newStr.split(':')[1]
    var keyprop1= newStr.split(':')[0].trim()
    var keyval2 = newStr.split(':')[3]
    var keyprop2= newStr.split(':')[2].trim()
    var keyval3 = newStr2.split(':')[1]
    var keyprop3= newStr2.split(':')[0]

    $('.stops').css(keyprop1, keyval1)
    $('.stops').css(keyprop2, keyval2)
    $('.origStop').eq(1).css(keyprop3, keyval3)
    $('.origDiv').eq(1).css(keyprop3, keyval3)
})

$('.hBox5').click(function(){
    lightUpBox([20,0, 12])
})