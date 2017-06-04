//BEGIN GLOBAL STUFF

var pageCount= 0;

//if wrong more than 3 times, show answer
var wrongCount=0;

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

$('.startChal').click(function(){
    pageCount=16
    history.pushState(null,null, '/jsconstruction/'+pageCount)
    
    $('.sideSect').hide();
    $('.practiceStart').show();
    
    $('.interactme').hide();
    $('.interactme').eq(pageCount).show().css('display', 'inline-block');
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
    var par= $('.sideSect').eq(prev-1)
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

//if I wanted to check for multiple occurences of one character
//http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string
function checkInputs(arr, thisButton, answer){
    var counter = 0;

    //wildChar shows one other specific Character that the string should have, like . or =

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
        $('.advanceBtn:visible').css('pointer-events', 'auto');
        $('.advanceBtn:visible').css('background-color', 'green');
        $('.advanceBtn:visible').css('opacity', '1');

        // this needs to be outside the function below due to setTimeout
        //http://stackoverflow.com/questions/5226285/settimeout-in-for-loop-does-not-print-consecutive-values
        function setTheFields(i){
            var startTime = 2000 * i
            var endTime= 2000 * (i+1);
            setTimeout(function(){
                $('.interactme:visible').find('.userIn').eq(i).parent().siblings('.codeExp').css('opacity', '0')
                $('.interactme:visible').find('.userIn').eq(i).children('span').first().trigger('mouseover')
            }, startTime)
            setTimeout(function(){
                $('.interactme:visible').find('.userIn').eq(i).parents().eq(1).trigger('mouseleave')
                $('.interactme:visible').find('.userIn').eq(i).parent().siblings('.codeExp').css('opacity', '1')
            }, endTime)
        }

        // do all animations with delay in between
        for(var i=0; i< arr.length; i++){
            setTheFields(i);
        }

    }
}

$('.advanceBtn').click(function(){
    //Get random compliment
    var thisSlide= $(this).parents('.interactme').index();
    var randComp = compliments[Math.floor(Math.random() * compliments.length)];
    cellySide(thisSlide, randComp)

    $('.interactme').hide()
    $('.interactme').eq(pageCount).show('slow').css('display', 'inline-block');
})

$('.begin, .next').click(function(){

    nextSide(this)

})

$('.backBtn').click(function(){
    prevSide(this)
})

//END GLOBAL STUFF

$('.begin, .next').click(function(){

    $('.interactme').hide()
    $('.interactme').eq(pageCount).show('slow').css('display', 'inline-block');

})

$('.backBtn').click(function(){

    $('.interactme').hide()
    $('.interactme').eq(pageCount).show().css('display', 'inline-block');

})


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
    $('.interactme').eq(pageCount).show().css('display', 'inline-block');
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

function revealIfDesc(el){
    $(el).siblings('.ifWords').show();
}

function revealFuncDesc(el){
    $(el).parents('.nameCase').siblings('.paramWords').show();
}

function revealCrane(el){
    $(el).parent().siblings('.arm').css('display', 'block');
    $(el).animate({bottom:'10px'},500);
    $(el).siblings('.lowerCrane').animate({bottom:'10px'},500);
}

function revealTruck(el){
    $(el).parent().css('opacity', 0);
    $(el).parents('.varDec').removeClass('hiddenBack');
    
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

function revealCone(el){
    var par=$(el).parent()
    var parHTML= $(el).parent().html();
    parHTML= parHTML.replace('<span class="coneShow">(</span>','<img class="coneImg" src="/img/jsbuilder/cone.png"/>');
    parHTML= parHTML.replace('<span class="coneShow">)</span>','<img class="coneImg" src="/img/jsbuilder/cone.png"/>')
    $(par).html(parHTML);
}

function replaceFinger(el){
    $(el).find('.codeFocus').children('.point').replaceWith("<span class='pointFinger'>.</span>");
}

function replaceCone(el){
    $(el).find('.codeFocus').children('.coneImg').eq(0).replaceWith("<span class='coneShow'>(</span>");
    $(el).find('.codeFocus').children('.coneImg').eq(0).replaceWith("<span class='coneShow'>)</span>");
}

//these functions determine different spans and the associated animations

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

$('.codeFocus').on('mouseover', '.coneShow', function(){
    // Exception because we are removing the original this from DOM
    var el= $(this).parents('.nameCase')
    revealCone(this);
    revealIfDesc(el);
})

$('.ifDec').mouseleave(function(){
    hideDesc(this);
    replaceCone(this)
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




$('.vartest1').click(function(){
    // hack to make sure it accepts all quotes
    var replaceQuote= $('#var1').val().replace(/'/g, '"');
    $('#var1').val(replaceQuote)

    var correct= [['#var1',
        ['var ', 'foreman', '=', '"', ';'],
        ['(', ')', '{', '}']
    ]];
    var finAnswer= ["var foreman = 'yourName';"]
    checkInputs(correct, this, finAnswer)
})

$('#var1').on("change paste keyup", function(){
    var val=$(this).val();
    var actPane= $('.interactme:visible');
    $(actPane).find('.codeFocus').text(val)
    var curStr= $(actPane).find('.codeFocus').text()
    var newStr= curStr.split('=').join('<span class="loadTruck">=</span>')
    var newStr2= newStr.split(';').join('<span class="showStake">;</span>')
    $(actPane).find('.codeFocus').html(newStr2)
})

$('.vartest2').click(function(){
    var correct= [['#var2',
        ['var ', 'days', '=', 100, ';'],
        ['(', ')', '{', '}', '"', "'"]
    ]]
    var finAnswer= ["var days = 100;"]
    checkInputs(correct, this, finAnswer)
})

$('#var2').on("change paste keyup", function(){
    var val=$(this).val();
    var actPane= $('.interactme:visible');
    $(actPane).find('.codeFocus').text(val)
    var curStr= $(actPane).find('.codeFocus').text()
    var newStr= curStr.split('=').join('<span class="loadTruck">=</span>')
    var newStr2= newStr.split(';').join('<span class="showStake">;</span>')
    $(actPane).find('.codeFocus').html(newStr2)
})

$('.vartest3').click(function(){
    var correct= [['#var3',
        ['var ', 'siteActive', '=', 'false', ';'],
        ['(', ')', '{', '}', '"', "'"]
    ]]
    var finAnswer= ["var siteActive = false;"]
    checkInputs(correct, this, finAnswer)
})

$('#var3').on("change paste keyup", function(){
    var val=$(this).val();
    var actPane= $('.interactme:visible');
    $(actPane).find('.codeFocus').text(val)
    var curStr= $(actPane).find('.codeFocus').text()
    var newStr= curStr.split('=').join('<span class="loadTruck">=</span>')
    var newStr2= newStr.split(';').join('<span class="showStake">;</span>')
    $(actPane).find('.codeFocus').html(newStr2)
})

$('.vartest4').click(function(){
    var correct= [['#var4',
        ['var ', 'contractors', '=', '5', ';'],
        ['(', ')', '{', '}', '"', "'"]
    ],
    ['#var5',
        ['contractors', '=', '10', ';'],
        ['(', ')', '{', '}', '"', "'", 'var']
    ]]
    var finAnswer= ["var contractors = 5;", "contractors=10;"]
    checkInputs(correct, this, finAnswer)
})

$('#var4').on("change paste keyup", function(){
    var val=$(this).val();
    var actPane= $('.interactme:visible');
    $(actPane).find('.codeFocus').first().text(val)
    var curStr= $(actPane).find('.codeFocus').first().text()
    var newStr= curStr.split('=').join('<span class="loadTruck">=</span>')
    var newStr2= newStr.split(';').join('<span class="showStake">;</span>')
    $(actPane).find('.codeFocus').first().html(newStr2)
})

$('#var5').on("change paste keyup", function(){
    var val=$(this).val();
    var actPane= $('.interactme:visible');
    $(actPane).find('.codeFocus').last().text(val)
    var curStr= $(actPane).find('.codeFocus').last().text()
    var newStr= curStr.split('=').join('<span class="loadTruck">=</span>')
    var newStr2= newStr.split(';').join('<span class="showStake">;</span>')
    $(actPane).find('.codeFocus').last().html(newStr2)
})


$('.comptest1').click(function(){
    var correct= [['#comp1',
        ['workers', '===', 'hardHats', ';'],
        ['(', ')', '{', '}', '"', "'"]
    ]]
    var finAnswer= ["workers === hardhats;"]
    checkInputs(correct, this, finAnswer)
})

$('.comptest2').click(function(){
    // hack to make sure it accepts all quotes
    var replaceQuote= $('#comp2').val().replace(/'/g, '"');
    $('#comp2').val(replaceQuote)

    var correct= [['#comp2',
        ['roofType', '===', '"', 'shingles',  ';'],
        ['(', ')', '{', '}']
    ]]
    var finAnswer= ["roofType === 'shingles';"]
    checkInputs(correct, this, finAnswer)
})

$('.comptest3').click(function(){

    var correct= [['#comp3',
        ['nailCount', '===', '700', ';'],
        ['(', ')', '{', '}', '"', "'"]
    ]]
    var finAnswer= ["nailCount === 700;"]
    checkInputs(correct, this, finAnswer)
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

$('.memtest1').click(function(){
    var correct= [['#mem1',
        ['crane', '()', '.', ";"],
        ['{', '}', '"', "'"]
    ]]
    var finAnswer= ["crane.operator.pushButton();"]
    checkInputs(correct, this, finAnswer)
})

$('#mem1').on("change paste keyup", function(){
    var val=$(this).val();
    var actPane= $('.interactme:visible');
    $(actPane).find('.codeFocus').text(val)
    var curStr= $(actPane).find('.codeFocus').text()
    var newStr= curStr.split('.').join('<span class="pointFinger">.</span>')
    var newStr2= newStr.split(';').join('<span class="showStake">;</span>')
    $(actPane).find('.codeFocus').html(newStr2)
})

$('.paramtest1').click(function(){
    var correct= [['#param1',
        ['crane', '.', 'accelerate', '(', 5, ')', ";"],
        ['{', '}', '"', "'"]
    ]]
    var finAnswer= ["crane.accelerate(5);"]
    checkInputs(correct, this, finAnswer)

    $('.lineNums').children('h1').removeClass('funkySpace');
})

$('#param1').on("change paste keyup", function(){
    var val=$(this).val();
    var actPane= $('.interactme:visible');
    $(actPane).find('.codeFocus').text(val)
    var curStr= $(actPane).find('.codeFocus').text()
    var newStr= curStr.split('(').join('<span class="lowerCrane">(</span>')
    var newStr2= newStr.split(')').join('<span class="lowerCrane">)</span>')
    $(actPane).find('.codeFocus').html(newStr2)
})




$('.functest1').click(function(){
    var correct= [['#func1',
        ["var ", 'bricks', "=", "20", ";"],
        ['(', ')', '{', '}', '"', "'"]
    ], 
    ['#func2',
        ['return ', 'count', '*', 2,  ";"],
        ['(', ')', '{', '}', '"', "'"]
    ]]
    var finAnswer= ["var bricks=20;", "return count * 2;"]
    checkInputs(correct, this, finAnswer)
})

$('#func1').on("change paste keyup", function(){
    var val=$(this).val();
    var actPane= $('.interactme:visible');
    $(actPane).find('.varStatement').text(val)
    var curStr= $(actPane).find('.varStatement').text()
    var newStr= curStr.split('=').join('<span class="loadTruck">=</span>')
    $(actPane).find('.varStatement').html(newStr)
})

$('#func2').on("change paste keyup", function(){
    var val=$(this).val();
    var actPane= $('.interactme:visible');
    $(actPane).find('.returnStatement').text(val)
    var curStr= $(actPane).find('.returnStatement').text()
    var newStr= curStr.split('count').join('<span class="showValue">count</span>')
    $(actPane).find('.returnStatement').html(newStr)
})

$('.functest3').click(function(){
    var correct= [['#func3',
        ['function ', 'pourConcrete', '(', "walkway", ')', "{"],
        ['.', '=', '}', ';', '"', "'"]
    ], 
    ['#func4',
        ['return ',"walkway", "*", "3", ';'],
        ['(', ')', '{', '}', '"', "'"]
    ]]
    var finAnswer= ["function pourConcrete(walkway){", "return walkway * 3;"]
    checkInputs(correct, this, finAnswer)
})

$('#func3').on("change paste keyup", function(){
    var val=$(this).val();
    var actPane= $('.interactme:visible');
    $(actPane).find('.functionDefStatement').text(val)
    var curStr= $(actPane).find('.functionDefStatement').text()
    var newStr= curStr.split('(').join('<span class="lowerCrane">(</span>')
    var newStr2= newStr.split(')').join('<span class="lowerCrane">)</span>')
    var newStr3= newStr2.split('{').join('<span class="showFence">{</span>')
    $(actPane).find('.functionDefStatement').html(newStr3)
})

$('#func4').on("change paste keyup", function(){
    var val=$(this).val();
    var actPane= $('.interactme:visible');
    $(actPane).find('.returnStatement').text(val)
    var curStr= $(actPane).find('.returnStatement').text()
    var newStr= curStr.split('walkway').join('<span class="showValue">walkway</span>')
    $(actPane).find('.returnStatement').html(newStr)
})

$('.iftest1').click(function(){
    var correct= [['#if1',
        ['if', '(', 'siteActive', '===', 'false', ')'],
        [';', '{', '}', "'", '"', '.']
    ]]
    var finAnswer= ["if (siteActive === false)"]
    checkInputs(correct, this, finAnswer)
})

$('#if1').on("change paste keyup", function(){
    var val=$(this).val();
    var actPane= $('.interactme:visible');
    $(actPane).find('.codeFocus').text(val)
    var curStr= $(actPane).find('.codeFocus').text()
    var newStr= curStr.split('(').join('<span class="coneShow">(</span>')
    var newStr2= newStr.split(')').join('<span class="coneShow">)</span>')
    $(actPane).find('.codeFocus').html(newStr2)
})


$('.iftest2').click(function(){
    // hack to make sure it accepts all quotes
    var replaceQuote= $('#if2').val().replace(/'/g, '"');
    $('#if2').val(replaceQuote)
    var replaceQuote2= $('#if3').val().replace(/'/g, '"');
    $('#if3').val(replaceQuote2)

    var correct= [['#if2',
        ['if', '(', 'weather', '===', '"', 'rainy', ')', "{"],
        [';', '}', '.']
    ],['#if3',
        ['siteStatus', '=', '"', "closed", ';'],
        ['var ', ')', '{', '}', '(', ".", "==="]
    ]]
    var finAnswer= ["if (weather === 'rainy'){", "siteStatus = 'closed';"]
    checkInputs(correct, this, finAnswer)
})

$('#if2').on("change paste keyup", function(){
    var val=$(this).val();
    var actPane= $('.interactme:visible');
    $(actPane).find('.userIn').first().text(val)
    var curStr= $(actPane).find('.userIn').first().text()
    var newStr= curStr.split('(').join('<span class="coneShow">(</span>')
    var newStr2= newStr.split(')').join('<span class="coneShow">)</span>')
    var newStr3= newStr2.split('{').join('<span class="showFence">{</span>')
    $(actPane).find('.userIn').first().html(newStr3)
})

$('#if3').on("change paste keyup", function(){
    var val=$(this).val();
    var actPane= $('.interactme:visible');
    $(actPane).find('.userIn').last().text(val)
    var curStr= $(actPane).find('.userIn').last().text()
    var newStr= curStr.split('=').join('<span class="loadTruck">=</span>')
    var newStr2= newStr.split(';').join('<span class="showStake">;</span>')
    $(actPane).find('.userIn').last().html(newStr2)
})

$('.iftest3').click(function(){

    var correct= [['#if4',
        ['if', '(', 'children', '===', '2', ')', "{"],
        [';', '}', '.', "'", '"']
    ],['#if5',
        ['bathrooms', '=', "2", ';'],
        ['var ', ')', '{', '}', '(', ".", "'", '"', '===']
    ]]
    var finAnswer= ["if (children === 2) {", "bathrooms = 2;"]
    checkInputs(correct, this, finAnswer)
})

$('#if4').on("change paste keyup", function(){
    var val=$(this).val();
    var actPane= $('.interactme:visible');
    $(actPane).find('.userIn').first().text(val)
    var curStr= $(actPane).find('.userIn').first().text()
    var newStr= curStr.split('(').join('<span class="coneShow">(</span>')
    var newStr2= newStr.split(')').join('<span class="coneShow">)</span>')
    var newStr3= newStr2.split('{').join('<span class="showFence">{</span>')
    $(actPane).find('.userIn').first().html(newStr3)
})

$('#if5').on("change paste keyup", function(){
    var val=$(this).val();
    var actPane= $('.interactme:visible');
    $(actPane).find('.userIn').last().text(val)
    var curStr= $(actPane).find('.userIn').last().text()
    var newStr= curStr.split('=').join('<span class="loadTruck">=</span>')
    var newStr2= newStr.split(';').join('<span class="showStake">;</span>')
    $(actPane).find('.userIn').last().html(newStr2)
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