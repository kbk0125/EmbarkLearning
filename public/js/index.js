var activeCategory ="";
var activeDataCategory ="";
var activeSubCategory ="";
var goodURL= false;

//Capitalize first letter of a string
function capLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

$.get('/voteTotal', function (votes){
	for (var i= 0; i <votes.length; i++){
		var container = $('#opening').find("[data-category='"+votes[i].category+"']");
		$(container).children('.votes').text(votes[i].votes+' Votes');
		$(container).children('.links').text(votes[i].linkTot+' Tutorials');
	}
});

$('.menuToggle').click(function(){
	$('#sidebar').toggle('slide', {direction: 'right'});
});

// show/hide lists on sidebar
$(".catHead").click(function(){
	$(this).children('i').toggleClass('fa-chevron right fa-chevron-down');
	$(this).siblings('ul').toggle('blind');
	var txt= $(this).children('p').text();
	var datum= $(this).data('category');
	activeCategory=txt;
	activeDataCategory =datum;
	activeSubCategory = "";
	$('#opening').hide();
	$(".catHead").children('p').removeClass('listHighlight');
	$(this).children('p').addClass('listHighlight');
	$('.listSelect').removeClass('listHighlight');
	$('.learningCat').show();
	$('#topBar .search').addClass('searchShown');
	$( ".radioSet" ).buttonset();
	$('.learningCat').children('#mainPane').children('.topOptions').find('.head').children('.curCat').val(datum).trigger('change');
	$('.userPath').remove();
	//AJAX to get list of user entered forms for the whole category
	$.ajax({
		type:'GET',
		url: '/linkList',
		headers: { 'Access-Control-Allow-Origin': '*' },
		crossDomain: true,
		data: {listKey: datum}
	})
	.done(function(linkList){
		//Add user submitted plans to the list based on what users have added in past
		if(linkList.length){
			for(var i=0; i<linkList.length; i++){
				addLink(linkList[i]);
			}
		}
	});
});

//Trigger the thing above just for basic buttons on front page
$('.specClick').click(function(){
	var datum= $(this).data('category');
	$('#sidebar').find("[data-category='"+datum+"']").click();
});

//Counter as user types, must have all thre for all types of user input
$('.descLimit').keypress(function(){
	$(this).prev().text('Brief Description ('+$(this).val().length+'/140):');
});

$('.descLimit').keyup(function(){
	$(this).prev().text('Brief Description ('+$(this).val().length+'/140):');
});

$('.descLimit').keydown(function(){
	$(this).prev().text('Brief Description ('+$(this).val().length+'/140):');
});

//set 8 word limit to some fields
$('.wordLimit').keypress(function(e){
	var words = $(this).val().split(' ');
	if(words.length >8)
		e.preventDefault();
});

//Validate URLs for user input
//Issue with https links?
function validateURL(textval) {
	// Prevent catastrophic backtracking From http://stackoverflow.com/questions/10218594/how-can-i-make-this-regular-expression-not-result-in-catastrophic-backtracking
	var urlregex = /\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i;
	//var urlregex = new RegExp(
    //    "^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
	return urlregex.test(textval);
}


$('.validUrl').blur(function(){
	var url= $(this).val();
	var isValid=validateURL(url);
	//must have http/https at beginning, fair to expect this of user?
	if(isValid){
		$('.formError').css('color', 'green').text('This is a good url');
		$(this).scrollLeft(0);
	}
	else
		$('.formError').css('color', 'red').text('Please submit valid url beginning with http(s)');
	goodURL=isValid;
});

//Show diff subcategories in main window
$('.listSelect').click(function(){
	var keyData = $(this).data('filter');
	activeSubCategory =keyData;
	var keyCat= $(this).parent().siblings('.catHead').data('category');
	activeDataCategory = keyCat;
	var txt= $(this).text();
	$('.listSelect').removeClass('listHighlight');
	$(".catHead").children('p').removeClass('listHighlight');
	$(this).addClass('listHighlight');
	$('.userPath').remove();
	$('.curCat option[value="'+keyCat+'"][data-filter="'+keyData+'"]').prop('selected', true).trigger('change');

	//AJAX to get list of user entered forms based on both category and subcategory
	$.get('/subLinkList', {listKey: keyCat, subKey:keyData}, function (linkList){
		//Add user submitted plans to the list based on what users have added in past
		if(linkList.length){
			for(var i=0; i<linkList.length; i++){
				addLink(linkList[i]);
			}
		}
	});
});

$('.curCat').change(function(){
	var selectVal= $('.curCat option:selected').val();
	var dataEl= $('.curCat option:selected').data('filter');
	$('.learningCat').children('#mainPane').children('.topOptions').find('input[name="category"]').val(selectVal);
	$('.learningCat').children('#mainPane').children('.topOptions').find('input[name="subcat"]').val(dataEl);
});

//Filling out your key resources
$('.formBtn').click(function(ev){
	ev.preventDefault();

	var emptyTxt = $(this).parents('.chunk').find('input:text, textarea').filter(function() {
		return this.value === "";
	});

	var emptyRad= $(this).parents('.chunk').find('.radioSet').children('input:radio').filter(':checked').length;

	if(!emptyTxt.length && emptyRad >1 && goodURL){
		// This is where form submission will need to happen		
		$('.formError').text('');
		var form = $(this).parents('form');
		//eliminate empty fields
		//form.find(':input').filter(function() { return !this.value; }).attr('disabled', 'disabled');
		var newPlan = form.serialize();
		$.post('/addLink', newPlan, function(linkData){
			if (linkData.category == activeDataCategory){
				addLink(linkData);
			}
				

			//reset form
			$(form).children('.chunk').find('input:text, textarea').val("");
			$(form).children('.chunk').find('input:radio').prop('checked', false);
			$('.descLimit').prev().text('Brief Description (0/140):');
			$('.radioSet').buttonset('refresh');

		});
	}
	else{
		$('.formError').css('color', 'red').text('Please fill out each field');
	}
});

// Add the link once the user posts or overall GET
function addLink(linkData){
	var mainBody;
	var nowTime = Math.floor(Date.now() / 1000);
	var hourSec = 3600;
	var origTime = linkData.datecreated;
	var timeEl = nowTime - origTime;
	//Number of days elapsed since the link was posted
	var hoursEl= Math.floor(timeEl/hourSec);
	//https://medium.com/hacking-and-gonzo/how-hacker-news-ranking-algorithm-works-1d9b0cf2c08d#.8pinx8221
	var score = (linkData.votes)/ (Math.pow((hoursEl +2), 1.8));
	var shortDiff= linkData.challenge.slice(0, 1);
	

	var upvoteSeg='<div class="upVoteBox"><p class="approval">Helped!</p><h2 class="upTotal">'+linkData.votes+'</h2><i class="fa fa-thumbs-o-up upvoteBtn" data-uniqueid="'+linkData.id+'"></i></div>';
	if(linkData.subcategory.length > 1)
		mainBody = '<div class="linkSum"><div class="topLine"><a href="'+linkData.link+'" target="_blank"><h3>'+capLetter(linkData.title)+'</h3></a><p class="subcat">'+linkData.subcategory+'</p><p class="filter">'+linkData.filter+'</p><p class="diff">'+shortDiff+'</p></div><p class="linkLab">'+linkData.link+'</p><p class="description">'+linkData.description+'</p></div>';
	else
		mainBody = '<div class="linkSum"><div class="topLine"><a href="'+linkData.link+'" target="_blank"><h3>'+capLetter(linkData.title)+'</h3></a><p class="filter">'+linkData.filter+'</p><p class="diff">'+shortDiff+'</p></div><p class="linkLab">'+linkData.link+'</p><p class="description">'+linkData.description+'</p></div>';
	var linkEntry = '<tr class="userPath" data-diff="'+linkData.challenge+'" data-type="'+linkData.filter+'" data-score="'+score+'"><td class="thumbUp">'+upvoteSeg+'</td><td class="mostTxt">'+mainBody+'</td></div>';

	//http://stackoverflow.com/questions/14160498/sort-element-by-numerical-value-of-data-attribute
	var wrapper = $('.addPathsBody').children('table').children('tbody');
	$(wrapper).prepend(linkEntry);
	wrapper.find('.userPath').sort(function(a, b) {
	    return +b.dataset.score - +a.dataset.score;
	})
	.prependTo(wrapper)
}

$('.legendBox').change(function(){
	var name = $(this).attr('name');
	var otherName;
	var att;
	var otheratt;
	var empty;
	var thisVals= [];
	var otherVals = [];
	var oneCatEmpty;
	if (name == 'diffFilter'){
		att= 'diff';
		otheratt ='type';
		otherName='contentFilter';
	}
	else if (name == 'contentFilter'){
		att= 'type';
		otheratt='diff';
		otherName='diffFilter';
	}
	var dataAtt = $(this).val();
	var checkStatus= $('input[name="'+name+'"]:checked').length;
	$('input[name="'+name+'"]:checked').each(function(){
		thisVals.push($(this).val());
	});
	$('input[name="'+otherName+'"]:checked').each(function(){
		otherVals.push($(this).val());
	});

	if(!(thisVals.length) && !(otherVals.length))
		empty =true;
	if(!(thisVals.length) || !(otherVals.length))
		oneCatEmpty= true;

	if($(this).is(':checked')){
		if(checkStatus ===1)
			$('.userPath').hide();
		if(oneCatEmpty)
			$('.addPathsBody').find("[data-"+att+"='"+dataAtt+"']").show();
		else{
			for(var j=0; j <otherVals.length; j++){
				$(".userPath[data-"+att+"='"+dataAtt+"'][data-"+otheratt+"='"+otherVals[j]+"']").show();
			}
		}
	}
	else{
		$('.addPathsBody').find("[data-"+att+"='"+dataAtt+"']").hide();
	}

	// if we just unchecked back to 0, show everything in that category
	if(checkStatus === 0){
		if(empty){
			$('.userPath').show();
		}
		else{
			$('.userPath').hide();
			for(var i=0; i <otherVals.length; i++){
				$(".userPath[data-"+otheratt+"='"+otherVals[i]+"']").show();
			}
		}
	}
});

$('.addPathsBody').on('mouseover', ".upvoteBtn", function(){
	$(this).siblings('p').css('opacity', '1');
});

$('.addPathsBody').on('mouseout', ".upvoteBtn", function(){
	$(this).siblings('p').css('opacity', '0');
});

//User can add only one vote to indicate their support for a plan, currently can refresh the page and then upvote again which needs to be fixed
var preClicked=[];
$('.addPathsBody').on('click', ".upvoteBtn", function(){
	var upvoteCount=parseInt($(this).siblings('.upTotal').text());
	var uniqueID = $(this).data('uniqueid');
	// if the user has not already added a vote this session
	if($.inArray(uniqueID, preClicked) ==-1){
		upvoteCount++;
		$(this).addClass('upvoted');
		$(this).unbind('click');
		$(this).siblings('.upTotal').text(upvoteCount);
		preClicked.push(uniqueID);
		$.post('/addVote',  {myid:uniqueID, votecount:upvoteCount});
	}
});

$('.fa-search').click(function(){
	var searchTxt= $(this).siblings('input').val();
	var foundin = $('.userPath:contains("'+searchTxt+'")');
	for (var i=0; i < foundin.length; i++){
		$('.addPathsBody').children('table').children('tbody').prepend(foundin[i]);
	}
});

$('.searchBox').keyup(function(e){
    if(e.keyCode == 13){
        $('.fa-search').click();
    }
});

$('.add').click(function(){
	$('.lightBox').show();
});

$('.fa-times').click(function(){
	$('.lightBox').hide();
});

//undo the css media query on resize
$(window).resize(function() {
	var windowsize = $(window).width();
	if (windowsize > 851) {
		$('#sidebar').show();
	}
});