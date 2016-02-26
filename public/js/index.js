var activeCategory;
var activeDataCategory;
var goodURL= false;

// show/hide lists on sidebar
$(".catHead").click(function(){
	$(this).children('i').toggleClass('fa-chevron right fa-chevron-down');
	$(this).siblings('ul').toggle('blind');
	var txt= $(this).children('p').text();
	var datum= $(this).data('category');
	activeCategory=txt;
	activeDataCategory =datum;
	$('#opening').hide();
	$('.learningCat').show();
	$('.learningCat').children('.newPath').find( ".radioSet" ).buttonset();
	$('.learningCat').children('.newPath').find('.head').children('.curCat').text(activeCategory+', All');
	$('.learningCat').children('.newPath').find('input[name="category"]').val(datum);
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

//Counter as user types
$('.descLimit').keypress(function(){
	$(this).prev().text('Brief Description ('+$(this).val().length+'/140):');
});

//set 7 word limit to some fields
$('.wordLimit').keypress(function(e){
	var words = $(this).val().split(' ');
	if(words.length >10)
		e.preventDefault();
});

//Validate URLs for user input
function validateURL(textval) {
  var urlregex = new RegExp(
        "^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
  return urlregex.test(textval);
}


$('.validUrl').blur(function(){
	var url= $(this).val();
	var isValid=validateURL(url);
	//must have http/https at beginning, fair to expect this of user?
	if(isValid){
		$('#formError').fadeIn().css('color', 'green').text('This is a good url');
		$(this).scrollLeft(0);
	}
	else
		$('#formError').fadeIn().css('color', 'red').text('Please submit valid url');
	goodURL=isValid;
});

//Show diff subcategories in main window
$('.listSelect').click(function(){
	var keyData = $(this).data('filter');
	var keyCat= $(this).parent().siblings('.catHead').data('category');
	var txt= $(this).text();
	$('.listSelect').removeClass('listHighlight');
	$(this).addClass('listHighlight');
	$('.userPath').remove();
	$('.learningCat').children('.newPath').find('.head').children('.curCat').text(activeCategory+', '+txt);
	$('.learningCat').children('.newPath').find('input[name="subcat"]').val(keyData);
	//AJAX to get list of user entered forms based on both category and subcategory
	$.ajax({
		type:'GET',
		url: '/subLinkList',
		headers: { 'Access-Control-Allow-Origin': '*' },
		crossDomain: true,
		data: {listKey: keyCat, subKey:keyData}
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

//Filling out your key resources
$('.formBtn').click(function(ev){
	ev.preventDefault();
	var emptyTxt = $(this).parents('.chunk').find('input:text, textarea').filter(function() {
		return this.value === "";
	});

	var emptyRad= $(this).parents('.chunk').find('.radioSet').children('input:radio').filter(':checked').length;

	if(!emptyTxt.length && emptyRad >1 && goodURL){
		// This is where form submission will need to happen		
		$('#formError').hide();
		var form = $(this).parents('form');
		//eliminate empty fields
		//form.find(':input').filter(function() { return !this.value; }).attr('disabled', 'disabled');
		var newPlan = form.serialize();
		$.ajax({
			type:'POST',
			url: '/addLink',
			headers: { 'Access-Control-Allow-Origin': '*' },
			crossDomain: true,
			data: newPlan
		})
		.done(function(linkData){
			console.log(linkData);
			addLink(linkData);

			//reset form
			form.trigger('reset');
		});
	}
	else{
		$('#formError').fadeIn().text('Please fill out each field');
	}
});

// Add the link once the user posts or overall GET
function addLink(linkData){
	var mainBody;
	var shortDiff= linkData.challenge.slice(0, 1);
	var upvoteSeg='<div class="upVoteBox"><h2 class="upTotal">'+linkData.upvotes+'</h2><i class="fa fa-thumbs-o-up upvoteBtn" data-uniqueid="'+linkData.id+'"></i><p class="approval">Helped!</p></div>';
	if(linkData.subcategory.length > 1)
		mainBody = '<div class="linkSum"><a href="'+linkData.link+'" target="_blank"><h3>'+linkData.title+'</h3></a><p class="subcat">'+linkData.subcategory+'</p><p class="filter">'+linkData.filter+'</p><p class="diff">'+shortDiff+'</p><p class="linkLab">'+linkData.link+'</p><p class="description">'+linkData.description+'</p></div>';
	else
		mainBody = '<div class="linkSum"><a href="'+linkData.link+'" target="_blank"><h3>'+linkData.title+'</h3></a><p class="filter">'+linkData.filter+'</p><p class="diff">'+shortDiff+'</p><p class="linkLab">'+linkData.link+'</p><p class="description">'+linkData.description+'</p></div>';
	var linkEntry='<div class="userPath data-diff="'+linkData.challenge+'" data-type="'+linkData.filter+'"">'+upvoteSeg+mainBody+'</div>';
	$('.addPathsBody').prepend(linkEntry);
}

//These need to be refined but whatevs- these 2 functions

$('.legendBox.content').change(function(){
	var name = $(this).attr('name');
	var dataAtt = $(this).val();
	var checkStatus= $('input[name="contentFilter"]:checked').length;
	if(checkStatus > 1){
		if($(this).is(':checked')){
			$('.addPathsBody').find("[data-type='"+dataAtt+"']").show();
		}
		else{
			$('.addPathsBody').find("[data-type='"+dataAtt+"']").hide();
		}
	}
	else if(checkStatus == 1){
		if($(this).is(':checked')){
			$('.userPath').hide();
			$('.addPathsBody').find("[data-type='"+dataAtt+"']").show();
		}
		else{
			$('.addPathsBody').find("[data-type='"+dataAtt+"']").hide();
		}
	}
	else{
		$('.userPath').show();
	}	
});

$('.legendBox.diff').change(function(){
	var name = $(this).attr('name');
	var dataAtt = $(this).val();
	var checkStatus= $('input[name="diffFilter"]:checked').length;
	if(checkStatus > 1){
		if($(this).is(':checked')){
			$('.addPathsBody').find("[data-type='"+dataAtt+"']").show();
		}
		else{
			$('.addPathsBody').find("[data-type='"+dataAtt+"']").hide();
		}
	}
	else if(checkStatus == 1){
		if($(this).is(':checked')){
			$('.userPath').hide();
			$('.addPathsBody').find("[data-type='"+dataAtt+"']").show();
		}
		else{
			$('.addPathsBody').find("[data-type='"+dataAtt+"']").hide();
		}
	}
	else{
		$('.userPath').show();
	}	
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
		$(this).siblings('.upTotal').text(upvoteCount);
		preClicked.push(justClicked);
		$.ajax({
			type:'POST',
			url: '/addVote',
			headers: { 'Access-Control-Allow-Origin': '*' },
			crossDomain: true,
			data: {myid:uniqueID, votecount:upvoteCount}
		});
	}
});

$('.fa-search').click(function(){
	var searchTxt= $(this).siblings('input').val();
	var foundin = $('.userPath:contains("'+searchTxt+'")');
	for (var i=0; i < foundin.length; i++){
		$('.addPathsBody').prepend(foundin[i]);
	}
});

$('.searchBox').keyup(function(e){
    if(e.keyCode == 13){
        $('.fa-search').click();
    }
});