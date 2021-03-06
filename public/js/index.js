var activeCategory ="";
var activeDataCategory ="";
var activeSubCategory ="";
var goodURL= false;
var dupe =["", ""];

$( ".radioSet" ).buttonset();

//Capitalize first letter of a string
function capLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

$.get('/voteTotal', function (votes){
	//since using WITH ROLLUP, do not count summary
	for (var i= 0; i <votes.length-1; i++){
		var container = $('#opening').find("[data-category='"+votes[i].category+"']");
		$(container).children('.votes').text(votes[i].votes+' Votes');
		$(container).children('.links').text(votes[i].linkTot+' Tutorials');
	}
	//This opens a category based on URL parameter
	if(window.location.pathname !== '/'){
		var str = window.location.pathname.replace(/\//g, '');
		var category = $('#sidebar').find("[data-category='"+str+"']");
		if(category.length > 0)
			$(category).trigger('click');
		else
			window.location.pathname = '/';
	}
});

$('.menuToggle').click(function(){
	$('#sidebar').toggle('slide', {direction: 'right'});
});

$('.logoContain').click(function (){
	$('.learningCat').hide();
	$('#opening').show();
	var sBar = $('#sidebar').find("[data-category='"+activeDataCategory+"']");
	shrinkSideBar();
	removeHighlight($(sBar).children('p'));
	window.history.pushState(null, null, '/');
})

function resetSideBar(dataCat){
	$(dataCat).children('i').toggleClass('fa-chevron right fa-chevron-down');
	$(dataCat).siblings('ul').toggle('blind');
}

function shrinkSideBar(){
	$('.catHead').children('i').removeClass('fa-chevron right fa-chevron-down');
	$('.catHead').siblings('ul').hide('blind');
}

function removeHighlight(){
	$(".catHead").children('p').removeClass('listHighlight');
	$('.listSelect').removeClass('listHighlight');
}

// show/hide lists on sidebar
$(".catHead").click(function(){
	var txt= $(this).children('p').text();
	var datum= $(this).data('category');

	resetSideBar($(this));
	$('#opening').hide();

	removeHighlight();
	$(this).children('p').addClass('listHighlight');

	if(datum !== dupe[0])
		window.history.pushState(null, null, "/"+datum);

	activeCategory=txt;
	activeDataCategory =datum;
	activeSubCategory = "";
	$('.legendBox').removeAttr('checked');
	$('.learningCat').show();
	$('.curCat').val(datum).trigger('change');
	$('.userPath').remove();
	$('.learnSum').remove();
	//AJAX to get list of user entered forms for the whole category
	$.get('/linkList', {listKey: datum}, function (linkList){
		//Add user submitted plans to the list based on what users have added in past
		addHeader(linkList[0]);
		if(linkList[1].length){
			for(var i=0; i<linkList[1].length; i++){
				addLink(linkList[1][i]);
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
$('.descLimit').on('keypress keyup keydown', function(){
	$(this).prev().text('Brief Description ('+$(this).val().length+'/140):');
});

//set 8 word limit to some fields
$('.wordLimit').keypress(function(e){
	var words = $(this).val().split(' ');
	if(words.length >8)
		e.preventDefault();
});

//Validate URLs for user input
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
	var keyCat= $(this).parent().siblings('.catHead').data('category');
	var txt= $(this).text();
	
	removeHighlight();
	$(this).addClass('listHighlight');
	
	activeSubCategory =keyData;
	activeDataCategory = keyCat;
	
	if(keyCat !== dupe[0] && keyData !== dupe[1])
		window.history.pushState(null, null, '/'+keyCat+'/'+keyData);
	$('.userPath').remove();
	$('.learnSum').remove();
	$('.curCat option[value="'+keyCat+'"][data-filter="'+keyData+'"]').prop('selected', true).trigger('change');
	$('.legendBox').removeAttr('checked');
	//AJAX to get list of user entered forms based on both category and subcategory
	$.get('/subLinkList', {listKey: keyCat, subKey:keyData}, function (linkList){
		//Add user submitted plans to the list based on what users have added in past
		addHeader(linkList[0]);
		if(linkList[1].length){
			for(var i=0; i<linkList[1].length; i++){
				addLink(linkList[1][i]);
			}
		}
	});
});

$('.curCat').change(function(){
	var selectVal= $('.curCat option:selected').val();
	var dataEl= $('.curCat option:selected').data('filter');
	$('input[name="category"]').val(selectVal);
	$('input[name="subcat"]').val(dataEl);
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
			if ($(this).parents('.lightBox'))
				$('.lightBox').hide();
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
	var shortDiff= linkData.challenge.slice(0, 3);
	

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

function addHeader(data){
	var title = "<h2>"+data.title+"</h2>";
	var sub = "<p>"+data.summary +"</p>"
	var reqs="";
	for(var i =0; i<data.reqs.length; i++){
		reqs += "<div><i class='fa fa-check'></i> <p class='listEl'>"+data.reqs[i]+"</p></div>";
	}
	var leftDiv= "<div class='suggest prev'><p class='title'> First, you GOTTA know: </p>"+reqs+"</div>"
	var next=""
	for(var i =0; i<data.next.length; i++){
		next +="<div><i class='fa fa-dot-circle-o'></i> <span class='leadIn'>"+data.next[i][0]+"</span><p class='listEl'>"+data.next[i][1]+"</p></div>";
	}
	var rightDiv= "<div class='suggest next'><p class='title'> Next, you can learn: </p>"+next+"</div>"
	var whole ="<div class='learnSum'>"+title+sub+leftDiv+rightDiv+"</div>"
	$('.topOptions').prepend(whole);
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

window.onpopstate = function(){
	var prev =location.pathname;
	var str = prev.split("/");
	str.shift();
	if(str[0].length >1 && str.length ==1){
		var category = $('#sidebar').find("[data-category='"+str[0]+"']");
		dupe[0] = str[0];
		dupe[1] = "";
		$(category).trigger('click');
	}
	else if(str[0].length >1 && str.length ==2){
		var category = $('#sidebar').find("[data-category='"+str[0]+"']");
		var listEl = (category).siblings('ul').find("[data-filter='"+str[1]+"']");
		dupe[0] = str[0];
		dupe[1] = str[1];
		$(listEl).trigger('click');
	}
	else{
		$('.learningCat').hide();
		$('#opening').show();
		var sBar = $('#sidebar').find("[data-category='"+activeDataCategory+"']");
		shrinkSideBar();
		removeHighlight($(sBar).children('p'));
		dupe[0] = "";
		dupe[1] = "";
	}
}