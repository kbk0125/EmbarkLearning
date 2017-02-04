//BEGIN GLOBAL STUFF

var pageCount= 0;

//if wrong more than 3 times, show answer
var wrongCount=0;



$('#topBar img').click(function(){
    window.location.reload()
})

$('.startbtn, .startChal').click(function(){
    $(this).parents('.intro').fadeOut();
})

$('.startChal').click(function(){
    pageCount=16
    history.pushState(null,null, '/jsconstruction/'+pageCount)
    
    $('.sideSect').hide();
    $('.practiceStart').show();
    
    $('.interactme').hide();
    $('#interact16').show().css('display', 'inline-block');
})

function nextSide(prev){
    var par= $(prev).parents('.sideSect')

    $(par).hide();

    $(par).next().show('clip')

    //update page History with HTMl History API
    pageCount++
    history.pushState(null,null, '/jsconstruction/'+pageCount)

    //hide the HTML snip if it is up
    $('.htmlSnip').hide()
}

function cellySide(prev, comp){
    var par= $(prev).parents('.sideSect')
    $(par).hide();
    $('.randComp').text(comp)
    $('.compBox').fadeIn();


    setTimeout(function(){
        $('.compBox').fadeOut();
        $(par).next().show('clip')
    }, 1000)

    //update page History with HTMl History API
    pageCount++
    history.pushState(null,null, '/jsconstruction/'+pageCount)

    //hide the HTML snip if it is up
    $('.htmlSnip').hide()
}

function prevSide(prev){
    var par= $(prev).parents('.sideSect')
    $(par).hide();
    $(par).prev().show()

    //update page History with HTMl History API
    pageCount--
    history.pushState(null,null, '/jsconstruction/'+pageCount)

    //hide the HTML snip if it is up
    $('.htmlSnip').hide()
}

// Good validation needs to have
// 2 correct custom things and 2 pieces of Javascript?
// 2 examples of punctuation that is correct
// 1 thing that it can NOT include
// good error handling that spits out correct error


function checkInputs(arr, thisButton, answer){
    var counter = 0;

    //wildChar shows one other specific Character that the string should have, like . or =

    for(var i=0; i< arr.length; i++){
        /*http://stackoverflow.com/questions/17938186/trimming-whitespace-from-the-end-of-a-string-only-with-jquery*/
        var trimmedAns= $(arr[i][0]).val().replace(/\s*$/,"");
        var wrongPhrase = '';
        var wrongCharacter = '';
        var falsePos = '';

        //check if it contains all key phrases
        for(var j=0; j < arr[i][1].length; j++){
            var activeChar= arr[i][1][j];
            if(trimmedAns.indexOf(activeChar) == -1)
                wrongPhrase = activeChar;
        }

        for(var k=0; k < arr[i][2].length; k++){
            var activeChar= arr[i][2][k];
            if(trimmedAns.indexOf(activeChar) == -1)
                wrongCharacter = activeChar;
        }

        // this is for the Characters we don't want to see in there
        for(var l=0; l < arr[i][3].length; l++){
            var activeChar= arr[i][3][l];
            if(trimmedAns.indexOf(activeChar) > -1)
                falsePos = activeChar;
        }

        // make sure we save original err msg
        var origMsg= $(thisButton).siblings('.warn').text();

        // if it has both correct property name and value, and semi and colon are in there
        if(wrongCharacter.length == 0 && falsePos.length ==0 && wrongPhrase.length ==0)
            counter++
        else if(wrongPhrase.length > 0 && wrongCount == 0){
            $(thisButton).siblings('.warn').text('Did you spell everything correctly in answer '+(i+1)+'?').show();
            wrongCount++;
        }
        else if(wrongPhrase.length > 0 && wrongCount > 0){
            $(thisButton).siblings('.warn').text('I think you are missing ' + wrongPhrase + 'in answer ' +(i+1)).show();
            wrongCount++;
        }
        else if(wrongCharacter.length > 0 && wrongCount == 0){
            $(thisButton).siblings('.warn').text('Did you remember all the correct syntax?').show();
            wrongCount++;
        }
        else if(wrongCharacter.length > 0 && wrongCount > 0){
            $(thisButton).siblings('.warn').text('I think you forgot to include: '+wrongCharacter + 'in answer ' +(i+1)).show();
            wrongCount++;
        }
        else if(falsePos.length > 0 && wrongCount == 0){
            $(thisButton).siblings('.warn').text('You included a character that should not be in there in answer ' +(i+1)+'!').show();
            wrongCount++;
        }
        else if(falsePos.length > 0 && wrongCount > 0){
            $(thisButton).siblings('.warn').text('You included ' +falsePos+ 'in answer '+(i+1)+', which should not be in there.' ).show();
            wrongCount++;
        }
        //this case should never happen but fuck it I am leaving it in there
        else{
            $(thisButton).siblings('.warn').text(origMsg).show();
            wrongCount++;
        }

        //user has gotten it wrong three times or more
        if (wrongCount > 4)
            //put it in a span so the answer looks distinct
            if(answer.length == 1)
                $(thisButton).siblings('.warn').html("The answer is- <span>"+answer[0]+"</span>").show();
            else{
                $(thisButton).siblings('.warn').html("The answer is- <span>"+answer[0]+"</span><span>"+answer[1]+"</span>").show();
            }
    }

    if(counter === arr.length){
        //if(cb)
        //  cb(start, end, inc)
        wrongCount=0;
        $(thisButton).siblings('.warn').hide()

        //Get random compliment
        var randComp = compliments[Math.floor(Math.random() * compliments.length)];
        cellySide(thisButton, randComp)

        $('.interactme').hide()
        $('#interact'+(pageCount+1)).show('slow').css('display', 'inline-block');
    }
}

$('.begin, .next').click(function(){

    nextSide(this)

})

$('.backBtn').click(function(){
    prevSide(this)
})

//END GLOBAL STUFF

var compliments = [
    "Swell Job!",
    "Excellent Work!",
    "On To The Next One!",
    "Can't Stop Me Now!",
    "En Fuego!", 
    "You Da Bomb!",
    "This is too easy..."
]


//Toggle specific slide
$('.chooseSection i').click(function(){
    $(this).parent().hide();
})

$('.sectJump').click(function(){
    $('.chooseSection').show();
})

$('.chooseSection p').click(function(){
    var slide=$(this).data('jump')

    $('.sideSect').hide();
    $('.sideSect').eq(slide).show();
    

    //update page History with HTMl History API
    pageCount =slide
    history.pushState(null,null, '/jsconstruction/'+pageCount)

    $('.interactme').hide()
    $('#interact'+(pageCount+1)).show().css('display', 'inline-block');
})

function revealVarDesc(el){
    $(el).parents('.nameCase').siblings('.varWords').show();
}

function revealSemiDesc(el){
    $(el).parents('.nameCase').siblings('.semiWords').show();
}

function revealMemDesc(el){
    $(el).siblings('.memWords').show();
}

function revealFuncDesc(el){
    $(el).parents('.nameCase').siblings('.paramWords').show();
}

function revealCrane(el){
    $(el).parent().siblings('.arm').css('display', 'block');
    $(el).animate({bottom:'10px'},500);
}

function revealTruck(el){

    $(el).parents('.varDec').removeClass('hiddenBack');
    $(el).parent().css('opacity', 0);
    $(el).parent().siblings('.splitAnim').show(function(){
        $(el).parent().siblings('.splitAnim').children('.valLab').addClass('straightened')
    });
    
}

function revealStake(el){
    $(el).parent().siblings('img').show()
}

function hideDesc(el){
    $(el).children('.codeExp').hide();
}

function hideTruck(el){
    $(el).addClass('hiddenBack')
    $(el).find('.stake').hide()
}

function hideCrane(el){
    $(el).find('.arm').hide();
    $(el).find('.lowerCrane').animate({bottom:'0px'},250);
}

function hideFence(el){
    $(el).find('.fence').hide();
    $(el).find('.showFence').css('opacity', 1);
}

function revealFinger(el){
    var par=$(el).parent()
    var parHTML= $(el).parent().html();
    parHTML= parHTML.replace('<span class="pointFinger">.</span>','<img class="point" src="/img/jsbuilder/memPoint.png"/>')
    $(par).html(parHTML);
}

function replaceFinger(el){
    $(el).find('.codeFocus').children('.point').replaceWith("<span class='pointFinger'>.</span>");
}

$('.begin, .next').click(function(){

    $('.interactme').hide()
    $('#interact'+(pageCount+1)).show('slow').css('display', 'inline-block');

})

$('.backBtn').click(function(){

    $('.interactme').hide()
    $('#interact'+(pageCount+1)).show().css('display', 'inline-block');

})

$('.codeFocus').on('mouseover', '.loadTruck', function(){
    revealVarDesc(this);
    revealTruck(this);
})

$('.varDec').mouseleave(function(){
    hideDesc(this);
    hideTruck(this);
    $(this).find('.codeFocus').css('opacity', 1);
    $(this).find('.showStake').css('opacity', 1);
    $(this).find('.splitAnim').hide();
    $(this).find('.splitAnim').children('.valLab').removeClass('straightened')
})

$('.codeFocus').on('mouseover', '.showStake', function(){
    revealSemiDesc(this);
    revealStake(this);
    $(this).css('opacity', 0.1);
})

$('.valid1').click(function(){
    // hack to make sure it accepts all quotes
    var replaceQuote= $('#var1').val().replace(/'/g, '"');
    $('#var1').val(replaceQuote)

    var correct= [['#var1',
        ['var ', 'foreman'],
        ['"', '=', ';'],
        ['(', ')', '{', '}']
    ]];
    var finAnswer= ["var foreman = 'yourName';"]
    checkInputs(correct, this, finAnswer)
})

$('#var1').on("change paste keyup", function(){
    var val=$(this).val();
    $('#interact4').find('.codeFocus').text(val)
    var curStr= $('#interact4').find('.codeFocus').text()
    var newStr= curStr.split('=').join('<span class="loadTruck">=</span>')
    var newStr2= newStr.split(';').join('<span class="showStake">;</span>')
    $('#interact4').find('.codeFocus').html(newStr2)
})

$('.valid2').click(function(){
    var correct= [['#var2',
        ['var ', 'days', 100],
        ['=', ';'],
        ['(', ')', '{', '}', '"', "'"]
    ]]
    var finAnswer= ["var days = 100;"]
    checkInputs(correct, this, finAnswer)
})

$('#var2').on("change paste keyup", function(){
    var val=$(this).val();
    $('#interact5').find('.codeFocus').text(val)
    var curStr= $('#interact5').find('.codeFocus').text()
    var newStr= curStr.split('=').join('<span class="loadTruck">=</span>')
    var newStr2= newStr.split(';').join('<span class="showStake">;</span>')
    $('#interact5').find('.codeFocus').html(newStr2)
})

$('.valid7').click(function(){
    var correct= [['#var3',
        ['var ', 'siteActive', 'false'],
        ['=', ';'],
        ['(', ')', '{', '}', '"', "'"]
    ]]
    var finAnswer= ["var siteActive = false;"]
    checkInputs(correct, this, finAnswer)
})

$('#var3').on("change paste keyup", function(){
    var val=$(this).val();
    $('#interact6').find('.codeFocus').text(val)
    var curStr= $('#interact6').find('.codeFocus').text()
    var newStr= curStr.split('=').join('<span class="loadTruck">=</span>')
    var newStr2= newStr.split(';').join('<span class="showStake">;</span>')
    $('#interact6').find('.codeFocus').html(newStr2)
})

$('.valid8').click(function(){
    var correct= [['#var4',
        ['var ', 'contractors', '5'],
        ['=', ';'],
        ['(', ')', '{', '}', '"', "'"]
    ],
    ['#var5',
        ['contractors', '10'],
        ['=', ';'],
        ['(', ')', '{', '}', '"', "'", 'var']
    ]]
    var finAnswer= ["var contractors = 5;", "contractors=10;"]
    checkInputs(correct, this, finAnswer)
})

$('#var4').on("change paste keyup", function(){
    var val=$(this).val();
    $('#interact7').find('.codeFocus').first().text(val)
    var curStr= $('#interact7').find('.codeFocus').first().text()
    var newStr= curStr.split('=').join('<span class="loadTruck">=</span>')
    var newStr2= newStr.split(';').join('<span class="showStake">;</span>')
    $('#interact7').find('.codeFocus').first().html(newStr2)
})

$('#var5').on("change paste keyup", function(){
    var val=$(this).val();
    $('#interact7').find('.codeFocus').last().text(val)
    var curStr= $('#interact7').find('.codeFocus').last().text()
    var newStr= curStr.split('=').join('<span class="loadTruck">=</span>')
    var newStr2= newStr.split(';').join('<span class="showStake">;</span>')
    $('#interact7').find('.codeFocus').last().html(newStr2)
})


$('.valid9').click(function(){
    var correct= [['#comp1',
        ['workers', 'hardHats'],
        ['===', ';'],
        ['(', ')', '{', '}', '"', "'"]
    ]]
    var finAnswer= ["workers === hardhats;"]
    checkInputs(correct, this, finAnswer)
})

$('.valid10').click(function(){
    // hack to make sure it accepts all quotes
    var replaceQuote= $('#comp2').val().replace(/'/g, '"');
    $('#comp2').val(replaceQuote)

    var correct= [['#comp2',
        ['roofType', 'shingles'],
        ['===', '"', ';'],
        ['(', ')', '{', '}']
    ]]
    var finAnswer= ["roofType === 'shingles';"]
    checkInputs(correct, this, finAnswer)
})

$('.valid11').click(function(){

    var correct= [['#comp3',
        ['nailCount', '700'],
        ['===', ';'],
        ['(', ')', '{', '}', '"', "'"]
    ]]
    var finAnswer= ["nailCount === 700;"]
    checkInputs(correct, this, finAnswer)
})


$('.codeFocus').on('mouseover', '.pointFinger', function(){
    // Exception because we are removing the original this from DOM
    var el= $(this).parents('.nameCase')
    revealFinger(this);
    revealMemDesc(el);
})

$('.memberDec').mouseleave(function(){
    hideDesc(this);
    replaceFinger(this)
    $(this).find('.stake').hide()
    $(this).find('.showStake').css('opacity', 1);
})

$('.obj').mouseover(function(){
    var title='architectureTeam'+$(this).text()
    var desc= 'The ' + $(this).text() + 'is a member of'+$(this).closest('div').find('h2').text()+', but also an object. You must write the statement above to select this member.'
    var wholeSum= '<div class="hierInfo"><h3>'+title+'</h3><p>'+desc+'</p></div>'
    $(this).after(wholeSum)
})

$('.meth').mouseover(function(){
    var title='architectureTeam'+$(this).text()
    var desc= 'The ' + $(this).text() + 'is a method of'+$(this).closest('div').find('h2').text()+'. The methods listed here are the specific capabilities of the architectureTeam'
    var wholeSum= '<div class="hierInfo"><h3>'+title+'</h3><p>'+desc+'</p></div>'
    $(this).after(wholeSum)
})

$('.lev3').mouseover(function(){
    var title='architectureTeam'+$(this).prev('h3').text()+$(this).text()
    var desc= 'The ' + $(this).text() + 'is a method of '+$(this).prev('h3').text()+'. That element is the only one who can complete this method.'
    var wholeSum= '<div class="hierInfo"><h3>'+title+'</h3><p>'+desc+'</p></div>'
    $(this).after(wholeSum)
})

$('.obj, .meth, .lev3').mouseleave(function(){
    $(this).next('.hierInfo').remove();
})

$('.valid3').click(function(){
    var correct= [['#mem1',
        ['crane'],
        ['()', '.', ";"],
        ['{', '}', '"', "'"]
    ]]
    var finAnswer= ["crane.operator.pushButton();"]
    checkInputs(correct, this, finAnswer)
})

$('#mem1').on("change paste keyup", function(){
    var val=$(this).val();
    $('#interact14').find('.codeFocus').text(val)
    var curStr= $('#interact14').find('.codeFocus').text()
    var newStr= curStr.split('.').join('<span class="pointFinger">.</span>')
    var newStr2= newStr.split(';').join('<span class="showStake">;</span>')
    $('#interact14').find('.codeFocus').html(newStr2)
})

$('.codeFocus').on('mouseover', '.lowerCrane', function(){
    revealCrane(this);
    revealFuncDesc(this);
})

$('.funcDec, .codeLine').mouseleave(function(){
    hideCrane(this);
    hideDesc(this);
    hideFence(this);
})

$('.valid4').click(function(){
    var correct= [['#param1',
        ['accelerate', 5, 'crane'],
        ['(', '.', ')', ";"],
        ['{', '}', '"', "'"]
    ]]
    var finAnswer= ["crane.accelerate(5);"]
    checkInputs(correct, this, finAnswer)

    $('.lineNums').children('h1').removeClass('funkySpace');
})

$('#param1').on("change paste keyup", function(){
    var val=$(this).val();
    $('#interact16').find('.codeFocus').text(val)
    var curStr= $('#interact16').find('.codeFocus').text()
    var newStr= curStr.split('(').join('<span class="lowerCrane">(</span>')
    var newStr2= newStr.split(')').join('<span class="lowerCrane">)</span>')
    $('#interact16').find('.codeFocus').html(newStr2)
})


$('.showValue').mouseover(function(){
    revealFuncDesc(this)

    var position=$(this).position()
    $(this).parent().siblings('.numHover').css({'top': position.top-20, 'left':position.left+40}).show('drop',{direction: 'down'}, 'slow')
    var that=this;
    setTimeout(function(){
        $(that).parent().siblings('.numHover').fadeOut('slow')
    }, 1000)
})

$('.codeFocus').on('mouseover', '.downNumber', function(){
    var position=$(this).position()
    $(this).parent().siblings('.numHover').css({'top': position.top-30, 'left':position.left+40}).show('drop',{direction: 'up'}, 'slow')
    var that=this;
    setTimeout(function(){
        $(that).parent().siblings('.numHover').fadeOut('slow')
    }, 1000)
})

$('.codeFocus').on('mouseover', '.upNumber', function(){
    var position=$(this).position()
    $(this).parent().siblings('.numHover').css({'top': position.top-30, 'left':position.left+40}).show('drop',{direction: 'down'}, 'slow')
    var that=this;
    setTimeout(function(){
        $(that).parent().siblings('.numHover').fadeOut('slow')
    }, 1000)
})

$('.showFence').mouseover(function(){
    var position=$(this).position()
    $(this).css('opacity', 0.2);
    $(this).parent().siblings('.fence').css({'top': position.top, 'left':position.left}).show()
})

$('.valid5').click(function(){
    var correct= [['#func1',
        ['bricks',"20", "var "],
        ["=", ";"],
        ['(', ')', '{', '}', '"', "'"]
    ], 
    ['#func2',
        ['return ', 'count', 2],
        ['*', ";"],
        ['(', ')', '{', '}', '"', "'"]
    ]]
    var finAnswer= ["var bricks=20;", "return count * 2;"]
    checkInputs(correct, this, finAnswer)
})

$('#func1').on("change paste keyup", function(){
    var val=$(this).val();
    $('#interact19').find('.varStatement').text(val)
    var curStr= $('#interact19').find('.varStatement').text()
    var newStr= curStr.split('=').join('<span class="loadTruck">=</span>')
    $('#interact19').find('.varStatement').html(newStr)
})

$('#func2').on("change paste keyup", function(){
    var val=$(this).val();
    $('#interact19').find('.returnStatement').text(val)
    var curStr= $('#interact19').find('.returnStatement').text()
    var newStr= curStr.split('count').join('<span class="showValue">count</span>')
    $('#interact19').find('.returnStatement').html(newStr)
})

$('.valid6').click(function(){
    var correct= [['#func3',
        ['function ', 'pourConcrete',"walkway"],
        ['(', ')', "{"],
        ['.', '=', '}', ';']
    ], 
    ['#func4',
        ['return',"walkway", "3"],
        ["*", ';'],
        ['(', ')', '{', '}', '"', "'"]
    ]]
    var finAnswer= ["function pourConcrete(walkway){", "return walkway * 3;"]
    checkInputs(correct, this, finAnswer)
})

$('#func3').on("change paste keyup", function(){
    var val=$(this).val();
    $('#interact21').find('.functionDefStatement').text(val)
    var curStr= $('#interact21').find('.functionDefStatement').text()
    var newStr= curStr.split('(').join('<span class="lowerCrane">(</span>')
    var newStr2= newStr.split(')').join('<span class="lowerCrane">)</span>')
    var newStr3= newStr2.split('{').join('<span class="showFence">{</span>')
    $('#interact21').find('.functionDefStatement').html(newStr3)
})

$('#func4').on("change paste keyup", function(){
    var val=$(this).val();
    $('#interact21').find('.returnStatement').text(val)
    var curStr= $('#interact21').find('.returnStatement').text()
    var newStr= curStr.split('walkway').join('<span class="showValue">walkway</span>')
    $('#interact21').find('.returnStatement').html(newStr)
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
    $('#interact'+(pageCount)).show().css('display', 'inline-block');
}