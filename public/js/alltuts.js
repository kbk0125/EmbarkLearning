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


function checkInputs(arr, thisButton, wildChar, answer){
    var counter = 0;

    //wildChar shows one other specific Character that the string should have, like . or =

    for(var i=0; i< arr.length; i++){
        /*http://stackoverflow.com/questions/17938186/trimming-whitespace-from-the-end-of-a-string-only-with-jquery*/
        var trimmedAns= $(arr[i][0]).val().replace(/\s*$/,"");

        //see if specific input contains the appropriate property name
        var testVal1= trimmedAns.indexOf(arr[i][1]) > -1;
        //see if specific input contains the appropriate property value
        var testVal2= trimmedAns.indexOf(arr[i][2]) > -1;
        //check if line ends with semi colon
        var endSemi= trimmedAns.substr(-1) === ";";
        // check if line has a semi-colon
        var midQ= trimmedAns.indexOf(wildChar[i]) > -1;

        // make sure we save original err msg
        var origMsg= $(thisButton).siblings('.warn').text()

        // if it has both correct property name and value, and semi and colon are in there
        if(testVal1 && testVal2 && endSemi && midQ)
            counter++
        else if(!(endSemi && midQ)){
            $(thisButton).siblings('.warn').text('Do you have '+wildChar[i]+' and a semi-colon included?').show();
            wrongCount++;
        }
        else if(!testVal1){
            $(thisButton).siblings('.warn').text('Do you have the correct variable name(s)?').show();
            wrongCount++;
        }
        else if(testVal1 && !testVal2){
            $(thisButton).siblings('.warn').text('Do you have the correct value(s)?').show();
            wrongCount++;
        }
        //this case should never happen but fuck it I am leaving it in there
        else{
            $(thisButton).siblings('.warn').text(origMsg).show();
            wrongCount++;
        }

        //user has gotten it wrong three times or more
        if (wrongCount > 3)
            //put it in a span so the answer looks distinct
            $(thisButton).siblings('.warn').html("The answer is- <span>"+answer+"</span>").show();
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
        $('#interact'+(pageCount+1)).show()
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
    $('#interact'+(pageCount+1)).show()

})

$('.backBtn').click(function(){

    $('.interactme').hide()
    $('#interact'+(pageCount+1)).show()

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
    var correct= [['#var1','foreman',"'"]]
    var finAnswer= "var foreman = 'yourName';"
    checkInputs(correct, this, ['='], finAnswer)
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
    var correct= [['#var2','days',"100"]]
    var finAnswer= "var days = 100;"
    checkInputs(correct, this, ['='], finAnswer)
})

$('#var2').on("change paste keyup", function(){
    var val=$(this).val();
    $('#interact5').find('.codeFocus').text(val)
    var curStr= $('#interact5').find('.codeFocus').text()
    var newStr= curStr.split('=').join('<span class="loadTruck">=</span>')
    var newStr2= newStr.split(';').join('<span class="showStake">;</span>')
    $('#interact5').find('.codeFocus').html(newStr2)
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
    var desc= 'The ' + $(this).text() + 'is a member of'+$(this).closest('h2').text()+', but also an object. You must write the statement above to select this member.'
    var wholeSum= '<div class="hierInfo"><h3>'+title+'</h3><p>'+desc+'</p></div>'
    $(this).after(wholeSum)
})

$('.meth').mouseover(function(){
    var title='architectureTeam'+$(this).text()
    var desc= 'The ' + $(this).text() + 'is a method of'+$(this).closest('h2').text()+'. The methods listed here are the specific capabilities of the architectureTeam'
    var wholeSum= '<div class="hierInfo"><h3>'+title+'</h3><p>'+desc+'</p></div>'
    $(this).after(wholeSum)
})

$('.lev3').mouseover(function(){
    var title='architectureTeam'+$(this).closest('h3').text()+$(this).text()
    var desc= 'The ' + $(this).text() + 'is a method of '+$(this).closest('h3').text()+'. That element is the only one who can complete this method.'
    var wholeSum= '<div class="hierInfo"><h3>'+title+'</h3><p>'+desc+'</p></div>'
    $(this).after(wholeSum)
})

$('.obj, .meth, .lev3').mouseleave(function(){
    $(this).next('.hierInfo').remove();
})

$('.valid3').click(function(){
    var correct= [['#mem1','crane',"()"]]
    var finAnswer= "crane.operator.pushButton();, for example"
    checkInputs(correct, this, ['.'], finAnswer)
})

$('#mem1').on("change paste keyup", function(){
    var val=$(this).val();
    $('#interact9').find('.codeFocus').text(val)
    var curStr= $('#interact9').find('.codeFocus').text()
    var newStr= curStr.split('.').join('<span class="pointFinger">.</span>')
    var newStr2= newStr.split(';').join('<span class="showStake">;</span>')
    $('#interact9').find('.codeFocus').html(newStr2)
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
    var correct= [['#param1','accelerate',"5"]]
    var finAnswer= "crane.accelerate(5);"
    checkInputs(correct, this, ['.'], finAnswer)
})

$('#param1').on("change paste keyup", function(){
    var val=$(this).val();
    $('#interact11').find('.codeFocus').text(val)
    var curStr= $('#interact11').find('.codeFocus').text()
    var newStr= curStr.split('(').join('<span class="lowerCrane">(</span>')
    var newStr2= newStr.split(')').join('<span class="lowerCrane">)</span>')
    $('#interact11').find('.codeFocus').html(newStr2)
})


$('.showValue').mouseover(function(){
    revealFuncDesc(this)

    var position=$(this).position()
    $(this).parent().siblings('.numHover').css({'top': position.top-20, 'left':position.left+40}).show('drop', 'slow')
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
    var correct= [['#func1','bricks',"20"], ['#func2','return',"2"]]
    var finAnswer= "var bricks=20; return count + 5;"
    checkInputs(correct, this, ['=', '*'], finAnswer)
})

$('#func1').on("change paste keyup", function(){
    var val=$(this).val();
    $('#interact14').find('.varStatement').text(val)
    var curStr= $('#interact14').find('.varStatement').text()
    var newStr= curStr.split('=').join('<span class="loadTruck">=</span>')
    $('#interact14').find('.varStatement').html(newStr)
})

$('#func2').on("change paste keyup", function(){
    var val=$(this).val();
    $('#interact14').find('.returnStatement').text(val)
    var curStr= $('#interact14').find('.returnStatement').text()
    var newStr= curStr.split('count').join('<span class="showValue">count</span>')
    $('#interact14').find('.returnStatement').html(newStr)
})

$('.valid6').click(function(){
    var correct= [['#func3','function pourConcrete',"walkway"], ['#func4','return',"walkway"]]
    var finAnswer= "function pourConcrete(walkway){ return walkway * 2;"
    checkInputs(correct, this, ['{', '*'], finAnswer)
})

$('#func3').on("change paste keyup", function(){
    var val=$(this).val();
    $('#interact16').find('.functionDefStatement').text(val)
    var curStr= $('#interact16').find('.functionDefStatement').text()
    var newStr= curStr.split('(').join('<span class="lowerCrane">(</span>')
    var newStr2= newStr.split(')').join('<span class="lowerCrane">)</span>')
    var newStr3= newStr2.split('{').join('<span class="showFence">{</span>')
    $('#interact16').find('.functionDefStatement').html(newStr3)
})

$('#func4').on("change paste keyup", function(){
    var val=$(this).val();
    $('#interact16').find('.returnStatement').text(val)
    var curStr= $('#interact16').find('.returnStatement').text()
    var newStr= curStr.split('walkway').join('<span class="showValue">walkway</span>')
    $('#interact16').find('.returnStatement').html(newStr)
})