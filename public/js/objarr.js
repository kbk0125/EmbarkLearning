//BEGIN GLOBAL STUFF

var pageCount= 0;

//if wrong more than 3 times, show answer
var wrongCount=0;
var grillDay=['o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o'];
var prevGrill=[];

var compliments = [
    "Swell Job!",
    "Excellent Work!",
    "On To The Next One!",
    "Can't Stop Me Now!",
    "En Fuego!", 
    "You Da Bomb!",
    "This is too easy..."
]

$('#topBar img').click(function(){
    window.location.reload()
})

$('.startbtn, .startChal').click(function(){
    $(this).parents('.intro').fadeOut();
})

function nextSide(prev){
    var par= $(prev).parents('.sideSect')

    $(par).hide();

    $(par).next().show('clip')

    //update page History with HTMl History API
    pageCount++
    history.pushState(null,null, '/objects-arrays-practice/'+pageCount)

    //hide the HTML snip if it is up
    $('.htmlSnip').hide()

}

function redoArray(){
     //update the array
    //$('.arrLatest').html('var grillDay = ['+grillDay+'];')
    var splitR= grillDay.toString()

    var parts = $.map(splitR.split(','), function(v){
        return $('<span>', {text:v+','});
    });
    $('.arrLatest').text('var grillDay = [')
    $('.arrLatest').append(parts);
    $('.arrLatest').append('];');
}

function cellySide(prev, comp){
    var par= $('.sideSect').eq(pageCount)
    $(par).hide();
    $('.randComp').text(comp)
    $('.compBox').fadeIn();


    setTimeout(function(){
        $('.compBox').fadeOut();
        $(par).next().show('clip')
    }, 1000)

    //update page History with HTMl History API
    pageCount++
    history.pushState(null,null, '/objects-arrays-practice/'+pageCount)

    //hide the HTML snip if it is up
    $('.htmlSnip').hide()
}

$('.advanceBtn').click(function(){
    //Get random compliment
    var randComp = compliments[Math.floor(Math.random() * compliments.length)];
    cellySide(randComp)

    $('.arrTip').fadeOut('slow')
    $('.advanceBtn').removeClass('clickReady');
    redoArray();
})

function prevSide(prev){
    var par= $(prev).parents('.sideSect')
    $(par).hide();
    $(par).prev().show()

    //update page History with HTMl History API
    pageCount--
    history.pushState(null,null, '/objects-arrays-practice/'+pageCount)

    //hide the HTML snip if it is up
    $('.htmlSnip').hide()
}

//if I wanted to check for multiple occurences of one character
//http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string
function checkInputs(arr, thisButton, answer){
    var counter = 0;

    //wildChar shows one other specific Character that the string should have, like . or =
    console.log(arr[0])
    for(var i=0; i< arr.length; i++){
        /*http://stackoverflow.com/questions/17938186/trimming-whitespace-from-the-end-of-a-string-only-with-jquery*/
        var trimmedAns= $(arr[i][0]).val().replace(/\s*$/,"");
        var wrongPhrase = '';
        var falsePos = '';

        //check if it contains all key phrases
        for(var j=0; j < arr[i][1].length; j++){
            var activeChar= arr[i][1][j];
            if(trimmedAns.indexOf(activeChar) == -1){
                wrongPhrase = activeChar;
                break;
            }
        }

        // this is for the Characters we don't want to see in there
        for(var l=0; l < arr[i][2].length; l++){
            var activeChar= arr[i][2][l];
            if(trimmedAns.indexOf(activeChar) > -1)
                falsePos = activeChar;
        }

        // make sure we save original err msg
        var origMsg= $(thisButton).siblings('.warn').text();

        // if it has both correct property name and value, and semi and colon are in there
        if(falsePos.length ==0 && wrongPhrase.length ==0)
            counter++
        else if(wrongPhrase.length > 1 && wrongCount == 0){
            $(thisButton).siblings('.warn').text('Did you spell everything correctly in answer '+(i+1)+'? Attempts Remaining: ' +(5-wrongCount)).show('slide');
            $(arr[i][0]).effect('highlight');
            wrongCount++;
        }
        else if(wrongPhrase.length > 1 && wrongCount > 0){
            $(thisButton).siblings('.warn').text('I think you are missing ' + wrongPhrase + ' in answer ' +(i+1)+ '. Attempts Remaining: ' +(5-wrongCount) ).show('slide');
            $(arr[i][0]).effect('highlight');
            wrongCount++;
        }
        else if(wrongPhrase.length == 1 && wrongCount == 0){
            $(thisButton).siblings('.warn').text('Did you remember all the correct syntax? Attempts Remaining: ' +(5-wrongCount)).show('slide');
            $(arr[i][0]).effect('highlight');
            wrongCount++;
        }
        else if(wrongPhrase.length == 1 && wrongCount > 0){
            $(thisButton).siblings('.warn').text('I think you forgot to include '+wrongPhrase + ' in answer ' +(i+1) + '. Attempts Remaining: ' +(5-wrongCount)).show('slide');
            $(arr[i][0]).effect('highlight');
            wrongCount++;
        }
        else if(falsePos.length > 0 && wrongCount == 0){
            $(thisButton).siblings('.warn').text('You included a character that should not be in there in answer ' +(i+1)+'! Attempts Remaining: ' +(5-wrongCount)).show('slide');
            $(arr[i][0]).effect('highlight');
            wrongCount++;
        }
        else if(falsePos.length > 0 && wrongCount > 0){
            $(thisButton).siblings('.warn').text('You included ' +falsePos+ ' in answer '+(i+1)+', which should not be in there. Attempts Remaining: ' +(5-wrongCount) ).show('slide');
            $(arr[i][0]).effect('highlight');
            wrongCount++;
        }
        //this case should never happen but fuck it I am leaving it in there
        else{
            $(thisButton).siblings('.warn').text(origMsg).show('slide');
            $(arr[i][0]).effect('highlight');
            wrongCount++;
        }

        //user has gotten it wrong three times or more
        if (wrongCount > 5){
            //put it in a span so the answer looks distinct
            if(answer.length == 1)
                $(thisButton).siblings('.warn').html("The answer is- <span>"+answer[0]+"</span>").show('slide');
            else{
                $(thisButton).siblings('.warn').html("The answer is- <span>"+answer[0]+"</span><span>"+answer[1]+"</span>").show('slide');
            }
        }
    }

    if(counter === arr.length){
        wrongCount=0;
        $(thisButton).siblings('.warn').hide()

        // enable continue button
        var keyInd=arr[0][3][0];
        var keyTxt=arr[0][3][1];
        grillDay[keyInd] = keyTxt;
        $('.advanceBtn').addClass('clickReady');

    }
}

$('.begin, .next').click(function(){

    nextSide(this)

})

$('.backBtn').click(function(){
    prevSide(this)
})

//END GLOBAL STUFF


$('.showArr').click(function(){
    $('.arrStat').fadeIn();
    $('.advanceBtn').fadeIn();
    redoArray()
})


$('.arrtest1').click(function(){
    // hack to make sure it accepts all quotes
    var replaceQuote= $('#arr1').val().replace(/'/g, '"');
    $('#arr1').val(replaceQuote)
    $('#eastvill').fadeIn()

    var correct= [['#arr1',
        ['grillDay', '[', '19', ']', '=', '"', 'eastvillage', '"', ';'],
        ['(', ')', '{', '}'],
        [19,'"eastvillage"']
    ]];
    var finAnswer= ["grillDay[19] = 'eastvillage';"]
    checkInputs(correct, this, finAnswer)
})

$('#arr1, #arr2').on("change paste keyup", function(){
    var val=$(this).val();
    var strMatch=val.split('=')[1];

    if(val.match(/\[(.*?)\]/) && val.indexOf('=') > -1){
        // this checks if it has two square brackers
        var sqMatch = val.match(/\[(.*?)\]/)[1];
        $('.arrLatest span').eq(sqMatch).text(strMatch.split(';')[0]+',')
        $('.arrLatest span').eq(sqMatch).mouseover();
    }
})

$('.arrtest2').click(function(){
    // hack to make sure it accepts all quotes
    var replaceQuote= $('#arr2').val().replace(/'/g, '"');
    $('#arr2').val(replaceQuote)

    var correct= [['#arr1',
        ['grillDay', '[', '20', ']', '=', '"', 'transit', '"', ';'],
        ['(', ')', '{', '}'],
        [20,'"transit"']
    ]];
    var finAnswer= ["grillDay[20] = 'transit';"]
    checkInputs(correct, this, finAnswer)
})


//make sure back button functions
window.onpopstate = function(){
    var prev =location.pathname;
    var str = prev.split("/");
    str.shift();
    var newSlide=str[1];

    pageCount=newSlide

    $('.sideSect').hide();
    $('.sideSect').eq(newSlide).show();

    $('.interactme').hide()
    $('.interactme').eq(pageCount).show().css('display', 'inline-block');
}

$('.arrLatest').on('mouseover', 'span', function(){
    var str= $(this).text().trim();
    var spanindex= $(this).index();
    var position=$(this).position()
    var width=Number($('.arrTip').width())/2

    $('.arrTip').css({'top': position.top+30, 'left':position.left-width}).fadeIn('slow')
    $('.position').text('Chapter: '+spanindex)
    $('.time').text('Time: '+spanindex+':00 - '+(spanindex+1)+':00')

    $('.mapTip').hide()

    if (str.match(/[a-z]/i) && str.length >2) {
        var newStr= str.replace(/,/g , "");
        $('.grillStat').text('Location: '+newStr)

        var firstFour=str.substring(1,5).toLowerCase();
        console.log(firstFour)

        var keyMarker=$(".mapContain").find("[data-short='" + firstFour + "']");

        if ($("[data-short^='"+firstFour+"']").length > 0)
            setMapTip(keyMarker)
    }
    else{
        $('.grillStat').text('Available')
    }
})

$('.arrLatest').mouseleave(function(){
    setTimeout(function(){
        $('.arrTip').fadeOut('slow')
    }, 1000)
});

$('.mapContain').on('mouseover', '.mapM', function(){
    var shortN= $(this).data('short')

    grillDay.forEach(function(d,i){
        if(d.toLowerCase().indexOf(shortN) > -1){
            console.log(i)
        }
    })

    setMapTip($(this))

})

function setMapTip(marker){
    var position=$(marker).position()
    var width=Number($('.mapTip').width())/2

    $('.mapTip').css({'top': position.top-60, 'left':position.left-width}).fadeIn('slow')

}

$('.triggerArrPopUp').click(function(){
    $('.arrLatest').children('span').eq(8).text('"WallStreet",')

    grillDay[8]= '"WallStreet"'


    //callback so that it shows up correctly
    $('#wallst').fadeIn(function(){
        $('.arrLatest').children('span').eq(8).mouseover();
    });
    
    // enable continue button
    $('.advanceBtn').addClass('clickReady');
})

$('.triggerTransPopUp').click(function(){
    $('.arrLatest').children('span').eq(9).text('"transit",')

    grillDay[9]= '"transit"'


    $('.arrLatest').children('span').eq(9).mouseover();
    
    // enable continue button
    $('.advanceBtn').addClass('clickReady');
})