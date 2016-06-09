var tomatoes = [
    {"width": 24, "height": 75, "color": "red"},
    {"width": 24, "height": 70, "color": "red"},
    {"width": 24, "height": 55, "color": "red"},
    {"width": 24, "height": 45, "color": "red"},
    {"width": 24, "height": 85, "color": "red"},
    {"width": 24, "height": 63, "color": "red"},
    {"width": 24, "height": 34, "color": "red"},
    {"width": 24, "height": 45, "color": "red"},
    {"width": 24, "height": 61, "color": "red"},
    {"width": 24, "height": 95, "color": "red"},
    {"width": 24, "height": 105, "color": "red"},
    {"width": 24, "height": 45, "color": "red"},
    {"width": 24, "height": 43, "color": "red"},
    {"width": 24, "height": 45, "color": "red"},
    {"width": 24, "height": 63, "color": "red"},
    {"width": 24, "height": 48, "color": "red"},
    {"width": 24, "height": 56, "color": "red"},
    {"width": 24, "height": 78, "color": "red"},
    {"width": 24, "height": 85, "color": "red"},
    {"width": 24, "height": 74, "color": "red"}
]

var peppers =[
    {"width": 20, "height": 75, "color": "yellow"},
    {"width": 20, "height": 70, "color": "yellow"},
    {"width": 20, "height": 55, "color": "yellow"},
    {"width": 20, "height": 45, "color": "yellow"},
    {"width": 20, "height": 85, "color": "yellow"},
    {"width": 20, "height": 63, "color": "yellow"},
    {"width": 20, "height": 34, "color": "yellow"},
    {"width": 20, "height": 45, "color": "yellow"},
    {"width": 20, "height": 61, "color": "yellow"},
    {"width": 20, "height": 95, "color": "yellow"},
    {"width": 20, "height": 105, "color": "yellow"},
    {"width": 20, "height": 45, "color": "yellow"},
    {"width": 20, "height": 43, "color": "yellow"},
    {"width": 20, "height": 45, "color": "yellow"},
    {"width": 20, "height": 63, "color": "yellow"},
    {"width": 20, "height": 48, "color": "yellow"},
    {"width": 20, "height": 56, "color": "yellow"},
    {"width": 20, "height": 78, "color": "yellow"},
    {"width": 20, "height": 85, "color": "yellow"},
    {"width": 20, "height": 74, "color": "yellow"}
]

var cucumbers =[
    {"width": 20, "height": 75, "color": "green"},
    {"width": 20, "height": 70, "color": "green"},
    {"width": 20, "height": 55, "color": "green"},
    {"width": 20, "height": 45, "color": "green"},
    {"width": 20, "height": 85, "color": "green"},
    {"width": 20, "height": 63, "color": "green"},
    {"width": 20, "height": 34, "color": "green"},
    {"width": 20, "height": 45, "color": "green"},
    {"width": 20, "height": 61, "color": "green"},
    {"width": 20, "height": 95, "color": "green"},
    {"width": 20, "height": 105, "color": "green"},
    {"width": 20, "height": 45, "color": "green"},
    {"width": 20, "height": 43, "color": "green"},
    {"width": 20, "height": 45, "color": "green"},
    {"width": 20, "height": 63, "color": "green"},
    {"width": 20, "height": 48, "color": "green"},
    {"width": 20, "height": 56, "color": "green"},
    {"width": 20, "height": 78, "color": "green"},
    {"width": 20, "height": 85, "color": "green"},
    {"width": 20, "height": 74, "color": "green"}
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

function nextSide(prev){
    var par= $(prev).parents('.sideSect')
    $(par).hide();
    $(par).next().show()
}

$('.resize').resizable({
    animate:true,
    containment: '#main',
    disabled: true,
    helper: "ui-resizable-helper",
    resize: function( event, ui ) {
        $('#dimensions').text('Garden Dimensions: '+ ui.size.width+'px x '+ui.size.height+'px')
        boxWidth=ui.size.width
        boxHeight=ui.size.height -10
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
    $('.resize').resizable('enable')
})

$('.svgTrig').click(function(){
    if(boxWidth > 400 && boxHeight > 400){
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
    var selectState= $("#svg1").val().indexOf("gardenDiv") > -1
    var appendState= $("#svg2").val().indexOf("svg") > -1
    var widthState= $("#svg3").val().indexOf(boxWidth) > -1
    var heightState= $("#svg4").val().indexOf(boxHeight) > -1

    if(selectState && appendState && widthState && heightState){
        nextSide(this)
    }
    else{
        $(this).siblings('.warn').show();
    }
})

$('.valid2').click(function(){
    var allState= $('#select1').val().indexOf('rect.colorBar') > -1

    if(allState){
        nextSide(this)
        //determine nuber that can fit in across row
        widthLim= Math.floor(boxWidth/80) -1
        console.log(widthLim)
        //determine number of rows, 69 is height + padding
        heightLim= Math.floor(boxHeight/69)
        console.log(heightLim)
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
        $(this).siblings('.warn').show();
    }
})

$('.seedTrig').click(function(){
    var keyTxt= $(this).siblings('p').text().toLowerCase()
    var classN= eval(keyTxt)
    activeData = keyTxt.replace(/\s+/g, '')
    activePlant = $(this).data('name')
    console.log(classN)
    $('.uniqData').append('<p> var '+keyTxt+' = [</p>')
    for(var i=0; i<classN.length; i++){
        $('.uniqData').append('<p>'+JSON.stringify(classN[i])+',</p>')
    }
    $('.uniqData').append('<p>]</p>')
    $('#seedId').text('Add the data contained in the variable '+activeData)
})

$('.valid3').click(function(){
    var dataState= $("#data1").val().indexOf(activeData) > -1

    if(dataState){
        nextSide(this)
    }
    else{
        $(this).siblings('.warn').show();
    }
})

$('.valid4').click(function(){
    var enterState= $("#enter1").val().indexOf('enter') > -1

    if(enterState){
        nextSide(this)

        for(var i=0; i<20; i++){
            $('.resize').children('.seeds').append('<div><img class="seed" src="/img/d3garden/seeds.png"></div>')
        }
        for(var j=holeTotal; j>20; j--){
            $('.resize').children('.holes').children().eq(i).remove()
        }
        $('.resize').children('.holes').children('div').addClass('absoluted').width(newWidth).height(newHeight)
        $('.resize').children('.seeds').children('div').width(newWidth).height(newHeight)
    }
    else{
        $(this).siblings('.warn').show();
    }
})

$('.valid5').click(function(){
    var appendState= $("#append1").val().indexOf('rect') > -1

    if(appendState){
        nextSide(this)

        $('.resize').children('.seeds').children('div').remove()
        $('.resize').children('.holes').children('div').remove()

        for(var i=0; i<20; i++){
            $('.resize').children('.struct').append('<div><img class="structure" src="/img/d3garden/woodstand.png"></div>')
        }
        $('.resize').children('.struct').children('div').width(newWidth).height(newHeight)
        
    }
    else{
        $(this).siblings('.warn').show();
    }
})

$('.valid6').click(function(){
    var widthState= $("#width1").val().indexOf('return') > -1

    if(widthState){
        nextSide(this)
    }
    else{
        $(this).siblings('.warn').show();
    }
})

$('.valid7').click(function(){
    var heightState= $("#height1").val().indexOf('return') > -1

    if(heightState){
        nextSide(this)
        for(var i=0; i<1; i++){
            $('.resize').children('.plant').append('<div><img class="eachplant" src="/img/d3garden/'+activePlant+'plant.png"></div>')
        }
        $('.resize').children('.plant').children('div').width(newWidth).height(newHeight)
    }
    else{
        $(this).siblings('.warn').show();
    }
})

$('.valid8').click(function(){
    var xState= $("#x1").val().indexOf('d.width') > -1

    if(xState){
        nextSide(this)

        $('.resize').children('.plant').children('div').remove()
        for(var i=0; i<20; i++){
            $('.resize').children('.plant').append('<div><img class="eachplant" src="/img/d3garden/'+activePlant+'plant.png"></div>')
        }
        $('.resize').children('.plant').children('div').width(newWidth).height(newHeight)
    }
    else{
        $(this).siblings('.warn').show();
    }
})

$('.valid9').click(function(){
    var yState= $("#y1").val().indexOf('d.height') > -1

    if(yState){
        nextSide(this)

        runD3(eval(activeData))
        $('.resize').hide()
        $('.gardenDiv').show()
    }
    else{
        $(this).siblings('.warn').show();
    }
})

function runD3(data){
    var w= 530
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