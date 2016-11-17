var pageCount= 0;

var tomatoes = [
    {"width": 25, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "red"},
    {"width": 25, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "red"},
    {"width": 25, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "red"},
    {"width": 25, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "red"},
    {"width": 25, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "red"},
    {"width": 25, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "red"},
    {"width": 25, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "red"},
    {"width": 25, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "red"},
    {"width": 25, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "red"},
    {"width": 25, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "red"},
    {"width": 25, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "red"},
    {"width": 25, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "red"},
    {"width": 25, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "red"},
    {"width": 25, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "red"},
    {"width": 25, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "red"},
    {"width": 25, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "red"},
    {"width": 25, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "red"},
    {"width": 25, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "red"},
    {"width": 25, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "red"},
    {"width": 25, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "red"}
]

var peppers =[
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "yellow"},
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "yellow"},
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "yellow"},
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "yellow"},
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "yellow"},
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "yellow"},
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "yellow"},
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "yellow"},
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "yellow"},
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "yellow"},
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "yellow"},
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "yellow"},
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "yellow"},
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "yellow"},
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "yellow"},
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "yellow"},
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "yellow"},
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "yellow"},
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "yellow"},
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "yellow"}
]

var cucumbers =[
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "green"},
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "green"},
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "green"},
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "green"},
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "green"},
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "green"},
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "green"},
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "green"},
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "green"},
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "green"},
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "green"},
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "green"},
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "green"},
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "green"},
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "green"},
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "green"},
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "green"},
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "green"},
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "green"},
    {"width": 20, "height": Math.floor(Math.random() * (100 - 60 + 1)) + 60, "color": "green"}
]

var boxWidth;
var boxHeight;
var activeData;
var activePlant;
var holeTotal;
var widthLim;
var heightLim;
var boxRat;
var boxArea;
var newHeight;
var newWidth;

$('.backBtn').click(function(){
    prevSide(this)
})

function nextSide(prev){
    var par= $(prev).parents('.sideSect')
    $(par).hide();
    $(par).next().show()
    $('#main').children('.uniqData').hide()

    //update page History with HTMl History API
    pageCount++
    history.pushState(null,null, '/d3garden/'+pageCount)
}

function prevSide(prev){
    var par= $(prev).parents('.sideSect')
    $(par).hide();
    $(par).prev().show()

    //update page History with HTMl History API
    pageCount--
    history.pushState(null,null, '/d3garden/'+pageCount)
}

function validator(res, ans){
    var counter = 0;
    for(var i=0; i< res.length; i++){
        //see if specific input contains the appropriate property name
        var testVal1= $(res[i]).val().indexOf(ans[i][0]) > -1;
        //see if specific input contains the appropriate property value
        var testVal2= $(res[i]).val().indexOf(ans[i][1]) > -1;
        
        //check if line has quotes, unless it is specifically marked as not needing quotes
        if(ans[i][2] === false)
            var quotes = true
        else
            var quotes= $(res[i]).val().indexOf('"') > -1 || $(res[i]).val().indexOf('\'') > -1;
        // check if line has a semi-colon
        var parens= $(res[i]).val().indexOf('(') > -1 && $(res[i]).val().indexOf(')') > -1;

        var period= $(res[i]).val().indexOf('.') > -1;

        // if it has both correct property name and value, and semi and colon are in there
        if(testVal1 && testVal2 && quotes && parens && period)
            counter++
        else if(!(quotes && parens && period)){
            return('Does every element have quotes and parentheses and a period? Check answer ' +(i+1))
        }
        else{
            return('Check answer on input '+(i+1)+'. Your syntax seems to be right, but you have the wrong answer.')
        }
    }

    if(counter === res.length){
        return true;
    }
}

$('.resize').resizable({
    animate:true,
    containment: '#main',
    disabled: true,
    helper: "ui-resizable-helper",
    resize: function( event, ui ) {
        $('#dimensions').text('Garden Dimensions: '+ ui.size.width+'px x '+ui.size.height+'px')
        boxWidth= Math.round(ui.size.width)
        boxHeight= Math.round(ui.size.height -10)
    }
})

$('#topBar img').click(function(){
    window.location.reload()
})

$('.startbtn').click(function(){
    $(this).parents('.intro').fadeOut();
})

$('.norm').click(function(){
    nextSide(this)
})

$('.begin').click(function(){
    nextSide(this)
    $('.resize').css('opacity', '1')
    $('.resize').resizable('enable')
})

$('.svgTrig').click(function(){
    // 390 accounts for padding dimensions rather than 400
    if(boxWidth > 390 && boxHeight > 390){
        nextSide(this)
        $('.resize').resizable('disable')
        $('.resize').children('h3').remove()
        $('.resize').children('p').remove()
        $('.resize').css('background', '#c49a6c')
        $('#boxWidth').text('Declare a width of '+boxWidth+'px')
        $('#boxHeight').text('Declare a height of '+boxHeight+'px')
    }
    else{
        $(this).siblings('.warn').show();
    }
})

$('.valid').click(function(){
    var answers= [$("#svg1"), $("#svg2"), $("#svg3"), $("#svg4")]
    var curAnswers= [['d3.select', '.gardenDiv'], ['.append', 'svg'], ['.attr', boxWidth+'px'], ['.attr', boxHeight+'px'] ]

    var finAnswer= validator(answers, curAnswers)
    console.log(finAnswer)

    if(finAnswer === true){
        nextSide(this)
        $('.graph').css('border', '1px solid #404040')
    }
    else{
        $(this).siblings('.warn').text(finAnswer).show();
    }
})

$('.valid2').click(function(){
    var answers= [$('#select1')]
    var curAnswers= [['selectAll', 'rect.colorBar']]
    var finAnswer= validator(answers, curAnswers)

    if(finAnswer === true){
        nextSide(this)
        //determine nuber that can fit in across row
        widthLim= Math.floor(boxWidth/80) -1

        //determine number of rows, 69 is height + padding
        heightLim= Math.floor(boxHeight/69)

        holeTotal= widthLim*heightLim
        for(var i=0; i<holeTotal; i++){
            $('.resize').children('.holes').append('<div><img class="hole" src="/img/d3garden/hole.png"></div>')
        }
        //ratio of width to height
        boxRat= boxWidth/boxHeight
        //split entire thing into 20 equal areas
        boxArea=Math.sqrt(boxWidth*boxHeight/20)
        //ratio one way
        newHeight= boxArea/boxRat
        //with 20% reduction to make sure it fits
        newWidth= boxArea*boxRat*0.8
    }
    else{
        $(this).siblings('.warn').text(finAnswer).show();
    }
})

$('.seedTrig').click(function(){
    var keyTxt= $(this).siblings('p').text().toLowerCase()
    var classN= eval(keyTxt)
    activeData = keyTxt.replace(/\s+/g, '')
    activePlant = $(this).data('name')

    $('.uniqData').append('<p> var '+keyTxt+' = [</p>')
    for(var i=0; i<classN.length; i++){
        $('.uniqData').append('<p class="indent">'+JSON.stringify(classN[i])+',</p>')
    }
    $('.uniqData').append('<p>]</p>')
    $('#seedId').text('Add the data contained in the variable '+activeData)
})

$('.valid3').click(function(){
    var answers= [$('#data1')]
    var curAnswers= [['data', activeData, false]]
    var finAnswer= validator(answers, curAnswers)

    if(finAnswer === true){
        nextSide(this)
    }
    else{
        $(this).siblings('.warn').text(finAnswer).show();
    }
})

$('.valid4').click(function(){
    var enterState= $("#enter1").val().indexOf('enter') > -1

    var answers= [$('#enter1')]
    var curAnswers= [['enter', 'enter', false]]
    var finAnswer= validator(answers, curAnswers)

    if(finAnswer === true){
        nextSide(this)

        for(var i=0; i<20; i++){
            $('.resize').children('.seeds').append('<div><img class="seed" src="/img/d3garden/seeds.png"></div>')
        }
        for(var j=holeTotal; j>20; j--){
            $('.resize').children('.holes').children().eq(i).remove()
        }
        $('.resize').children('.holes').children('div').addClass('absoluted').width(newWidth).height(newHeight)
        $('.resize').children('.seeds').children('div').width(newWidth).height(newHeight);
    }
    else{
        $(this).siblings('.warn').text(finAnswer).show();
    }
})

$('.valid5').click(function(){
    var appendState= $("#append1").val().indexOf('rect') > -1

    var answers= [$('#append1')]
    var curAnswers= [['append', 'rect']]
    var finAnswer= validator(answers, curAnswers)

    if(finAnswer === true){
        nextSide(this)

        $('.resize').children('.seeds').children('div').remove()
        $('.resize').children('.holes').children('div').remove()

        for(var i=0; i<20; i++){
            $('.resize').children('.struct').append('<div><img class="structure" src="/img/d3garden/woodstand.png"></div>')
        }
        $('.resize').children('.struct').children('div').width(newWidth).height(newHeight)
    }
    else{
        $(this).siblings('.warn').text(finAnswer).show();
    }
})

$('.valid6').click(function(){
    var answers= [$('#width1')]
    var curAnswers= [['return', 'd.width']]
    var finAnswer= validator(answers, curAnswers)

    if(finAnswer === true){
        nextSide(this)
    }
    else{
        $(this).siblings('.warn').text(finAnswer).show();
    }
})

$('.valid7').click(function(){
    var answers= [$('#height1')]
    var curAnswers= [['return', 'd.height']]
    var finAnswer= validator(answers, curAnswers)

    // REVIEW, make plant upside down with CSS
    if(finAnswer === true){
        nextSide(this)
        $('.graph').css('border', 'none')
        d3step1()
        for(var i=0; i<1; i++){
            $('.resize').children('.plant').append('<div><img class="eachplant reversed" src="/img/d3garden/'+activePlant+'plant.png"></div>')
        }
        $('.resize').children('.plant').children('div').width(newWidth).height(newHeight)
    }
    else{
        $(this).siblings('.warn').text(finAnswer).show();
    }
})

$('.valid8').click(function(){
    var answers= [$('#x1')]
    var curAnswers= [['return', 'd.width']]
    var finAnswer= validator(answers, curAnswers)

    if(finAnswer === true){
        nextSide(this)
        $('.graph').html('')
        d3step2()
        $('.resize').children('.plant').children('div').remove()
        for(var i=0; i<20; i++){
            $('.resize').children('.plant').append('<div><img class="eachplant reversed" src="/img/d3garden/'+activePlant+'plant.png"></div>')
        }
        $('.resize').children('.plant').children('div').width(newWidth).height(newHeight)
    }
    else{
        $(this).siblings('.warn').text(finAnswer).show();
    }
})

$('.valid9').click(function(){
    var answers= [$('#y1')]
    var curAnswers= [['return', 'divHeight']]
    var finAnswer= validator(answers, curAnswers)

    if(finAnswer === true){
        nextSide(this)
        $('.graphProg').hide()
        runD3(eval(activeData))
        $('.resize').hide()
        $('.gardenDiv').show()
    }
    else{
        $(this).siblings('.warn').text(finAnswer).show();
    }
})

$('.displayObj').click(function(){
    $('#main').children('.uniqData').show()
})

function runD3(data){
    var w= 535
    var h= 250
    var svg= d3.select('.gardenDiv').append('svg')
        .attr('width', w)
        .attr('height', h);

    svg.selectAll('rect.colorBar')
        .data(data)
        .enter()
        .append('rect')
        .attr('width', function(d,i){return d.width})
        .attr('height', function(d,i){return d.height*2})
        .attr('x', function(d,i){return i * (d.width+2)})
        .attr('y', function(d,i){return h - d.height*2})
        .attr('fill', 'white')
}

function runD3pt2(data){
    var w= 535
    var h= 250
    var svg= d3.select('.gardenDiv').append('svg')
        .attr('width', w)
        .attr('height', h);

    svg.selectAll('rect.colorBar')
        .data(data)
        .enter()
        .append('rect')
        .attr('width', function(d,i){return d.width})
        .attr('height', function(d,i){return d.height*2})
        .attr('x', function(d,i){return i * (d.width+2)})
        .attr('y', function(d,i){return h - d.height*2})
        .attr('fill', 'white')

    var xScale = d3.scale.linear()
        .domain( [0, data.length] )
        .range( [0, w] );

    var yScale = d3.scale.linear()
        .domain( [0, d3.max(data, function(d) { return d.height; })] )
        .range( [0, h] );

    var xAxis = d3.svg.axis().scale(xScale).ticks(0)
    var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(0)

    svg.append("g").attr("transform", "translate(5,0)").call(yAxis);

    svg.append("g").attr("transform", "translate(0," + (h-5) + ")").call(xAxis);
}

function d3step1(){
    var w= 292
    var h= 74
    var svg= d3.select('.graph').append('svg')
        .attr('width', w)
        .attr('height', h);

    svg.selectAll('rect.colorBar')
        .data(tomatoes)
        .enter()
        .append('rect')
        .attr('width', function(d,i){return d.width/1.5})
        .attr('height', function(d,i){return d.height/1.5})
}

function d3step2(){
    var w= 292
    var h= 74
    var svg= d3.select('.graph').append('svg')
        .attr('width', w)
        .attr('height', h);

    svg.selectAll('rect.colorBar')
        .data(tomatoes)
        .enter()
        .append('rect')
        .attr('width', function(d,i){return d.width/1.5})
        .attr('height', function(d,i){return d.height/1.5})
        .attr('x', function(d,i){return i * (d.width+2)})
}

function d3step3(){
    var w= 292
    var h= 74
    var svg= d3.select('.graph').append('svg')
        .attr('width', w)
        .attr('height', h);

    svg.selectAll('rect.colorBar')
        .data(tomatoes)
        .enter()
        .append('rect')
        .attr('width', function(d,i){return d.width/1.5})
        .attr('height', function(d,i){return d.height/1.5})
        .attr('x', function(d,i){return i * (d.width+2)})
        .attr('y', function(d,i){return h - (d.height/1.5)})
}

$('.axesStart').click(function(){
    $('.graphProg').show()
    $('.resize').show()
    $('.gardenDiv').hide()
    nextSide(this)
    $('.graph').html('')
    d3step3()
})

$('.valid10').click(function(){
    var answers= [$('#xscale1'), $("#xscale2"), $("#xscale3")]
    var curAnswers= [['scale', 'linear()', false], ['domain', 'data.length', false], ['range', 'width', false]]
    var finAnswer= validator(answers, curAnswers)

    if(finAnswer === true){
        nextSide(this)
    }
    else{
        $(this).siblings('.warn').text(finAnswer).show();
    }
})

$('.valid11').click(function(){

    var answers= [$('#yscale1'), $("#yscale2"), $("#yscale3")]
    var curAnswers= [['scale', 'linear()', false], ['d3.max', 'd.height', false], ['range', 'height', false]]
    var finAnswer= validator(answers, curAnswers)

    if(finAnswer === true){
        nextSide(this)
    }
    else{
        $(this).siblings('.warn').text(finAnswer).show();
    }
})

$('.valid12').click(function(){
    var answers= [$('#xaxis1'), $("#xaxis2")]
    var curAnswers= [['svg', 'axis()', false], ['scale', 'xScale', false]]
    var finAnswer= validator(answers, curAnswers)

    if(finAnswer === true){
        nextSide(this)
    }
    else{
        $(this).siblings('.warn').text(finAnswer).show();
    }
})

$('.valid13').click(function(){

    var answers= [$('#xaxis3'), $("#xaxis4")]
    var curAnswers= [['append', 'g'], ['call', 'xAxis', false]]
    var finAnswer= validator(answers, curAnswers)

    if(finAnswer === true){
        nextSide(this)
        $('.resize').append("<img class='topLine' src='/img/fencehoriz.png'/>")
    }
    else{
        $(this).siblings('.warn').text(finAnswer).show();
    }
})

$('.valid14').click(function(){

    var answers= [$('#yaxis1'), $("#yaxis2")]
    var curAnswers= [['svg', 'axis()', false], ['scale', 'yScale', false]]
    var finAnswer= validator(answers, curAnswers)

    if(finAnswer === true){
        nextSide(this)
    }
    else{
        $(this).siblings('.warn').text(finAnswer).show();
    }
})

$('.valid15').click(function(){
    var yaxis3= $("#yaxis3").val().indexOf('.append') > -1
    var yaxis4= $("#yaxis4").val().indexOf('yAxis') > -1

    var answers= [$('#yaxis3'), $("yxaxis4")]
    var curAnswers= [['append', 'g'], ['call', 'yAxis', false]]
    var finAnswer= validator(answers, curAnswers)

    if(finAnswer === true){
        nextSide(this)
        $('.resize').append("<img class='leftLine' src='/img/fencevert.png'/>")
    }
    else{
        $(this).siblings('.warn').text(finAnswer).show();
    }
})

$('.valid16').click(function(){

    var answers= [$('#xaxis5')]
    var curAnswers= [['transform', 'height']]
    var finAnswer= validator(answers, curAnswers)

    if(finAnswer === true){
        nextSide(this)
        $('.graphProg').hide()
        $('.gardenDiv').html('')
        runD3pt2(eval(activeData))
        $('.resize').hide()
        $('.gardenDiv').show()
    }
    else{
        $(this).siblings('.warn').text(finAnswer).show();
    }
})