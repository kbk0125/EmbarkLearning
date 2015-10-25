// show/hide lists on sidebar
$(".catHead").click(function(){
	$(this).children('i').toggleClass('fa-chevron right fa-chevron-down');
	$(this).siblings('ul').toggle('blind');
});

//Show dif guides in main window
$('.listSelect').click(function(){
	var keyData = $(this).data('filter');
	$('.listSelect').removeClass('listHighlight');
	$(this).addClass('listHighlight');
	$('#opening').hide();
	$('.learningCat').show();
	$('.userPath').remove();
	$('.learningCat').find('form').children('.basicInfo').children('.nameOfCat').val(keyData);
	//AJAX to get list of user entered forms, but only if there are already entries in that category
	$.ajax({
		type:'GET',
		url: '/planList',
		headers: { 'Access-Control-Allow-Origin': '*' },
		crossDomain: true,
		data: {listKey: keyData}
	})
	.done(function(planList){
		//Add user submitted plans to the list based on what users have added in past
		console.log(planList);
		if(planList.length)
			addPlan(planList);
	});
});

//Bring Up the form
$('.intro').click(function(){
	$(this).hide();
	$(this).siblings('.form').fadeIn();
});


//Filling out your key resources
$('.formBtn').click(function(){
	var emptyRad;
	var emptyTxt = $(this).siblings('input:text, textarea').filter(function() {
		return this.value === "";
	});
	if($(this).siblings('.radioSet').length)
		emptyRad= $(this).siblings('.radioSet').children('input:radio').filter(':checked').length;
	else
		emptyRad = 1;

	if(!emptyTxt.length && emptyRad >0){
		$(this).parent().hide();
		$(this).parent().next().fadeIn();
		//create radio buttons
		$(this).parent().next().children( ".radioSet" ).buttonset();
		$('#formError').hide();
	}
	else{
		$('#formError').fadeIn().text('Please fill out each field');
	}
});

//set 7 word limit to some fields
$('.wordLimit').keypress(function(e){
	var words = $(this).val().split(' ');
	if(words.length >7)
		e.preventDefault();
});

//Counter as user types
$('.descLimit').keypress(function(){
	$(this).prev().text('Brief Description ('+$(this).val().length+'/100):');
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
	if(isValid)
		$('#formError').fadeIn().text('This is a good url');
	else
		$('#formError').fadeIn().text('Please submit valid url');
});

// Add the plan once the user adds it
function addPlan(planData){
	// Array looks like : uniqueid, category, upvotes, First Name of Author, Plan Title, Brief Advice, Resource 1 Name, Resource 1 Link, Resource 1 Desc, Label 1, etc.,
	var topSegment = '<div class="titleTop"><h3>'+planData[4]+'</h3><p> By: '+planData[3]+'</div><p class="advice">' +planData[5]+ '</p>';
	var allBod= [];

	//If it is new, put it in new category. If part of repeated category, put it in bucket with similar ones.
	for(var i =6; i < planData.length; i+=4){
		var resource, index, link, desc, catTitle;
		if(allBod.indexOf('<h3>'+planData[i+3]+'</h3>') > -1){
			index = allBod.indexOf('<h3>'+planData[i+3]+'</h3>');
			desc = '<p>'+planData[i+2]+'</p>';
			allBod.splice(index+1, 0, desc);
			resource='<p>'+planData[i]+'</p>';
			link = '<a href="http://'+planData[i+1]+'" target="_blank">'+resource+'</a>';
			allBod.splice(index+1, 0, link);
		}
		else{
			catTitle = '<h3>'+planData[i+3]+'</h3>';
			allBod.push(catTitle);
			resource='<p>'+planData[i]+'</p>';
			link = '<a href="http://'+planData[i+1]+'" target="_blank">'+resource+'</a>';
			allBod.push(link);
			desc = '<p>'+planData[i+2]+'</p>';
			allBod.push(desc);
		}
	}
	var bottomBar='<div class="popBar"><p class="upTotal"></p><i class="fa fa-thumbs-o-up upvoteBtn"></i></div>';
		
	//Create the path with a header, the suggested items and an upvote option
	var pathContain = '<div class="path userPath" data-uniqueid="0">'+topSegment+'<div class="list">'+allBod.join('')+ '</div>' +bottomBar+'</div>';

	$('.pathsBody').append(pathContain);
	//Count number of upvotes done, but how to localize this in scope without long jquery selector?
	$('.pathsBody').children('.userPath').last().find('.upTotal').text(planData[2]);
	// make sure unique ID is available on front end
	$('.pathsBody').children('.userPath').last().data('uniqueid', planData[0]);
}

//Find which submit button was clicked within form
$("form input[type=submit]").click(function() {
    $("input[type=submit]", $(this).parents("form")).removeAttr("clicked");
    $(this).attr("clicked", "true");
});

$('form').on('submit', function(ev){
	ev.preventDefault();
	var submitBtn = $("input[type=submit][clicked=true]");
	//make sure all appropriate fields are filled
	var emptyRad;
	var emptyTxt = $(submitBtn).siblings('input:text, textarea').filter(function() {
		return this.value === "";
	});
	if($(submitBtn).siblings('.radioSet').length)
		emptyRad= $(submitBtn).siblings('.radioSet').children('input:radio').filter(':checked').length;
	else
		emptyRad = 1;

	if(!emptyTxt.length && emptyRad >0){
		//go forward with AJAX call
		var form = $(this);
		//eliminate empty fields
		form.find(':input').filter(function() { return !this.value; }).attr('disabled', 'disabled');
		var newPlan = form.serialize();
		$.ajax({
			type:'POST',
			url: '/addPlan',
			headers: { 'Access-Control-Allow-Origin': '*' },
			crossDomain: true,
			data: newPlan
		})
		.done(function(planData){
			// add plan to list
			addPlan(planData);

			//reset form
			form.trigger('reset');
			var sameCat = $('.listHighlight').data('filter');
			form.children('.basicInfo').children('.nameOfCat').val(sameCat);
			form.find(':input').removeAttr('disabled');
			$('.chunk').hide();
			$('.basicInfo').show();
			form.parent().hide();
			$('.intro').fadeIn();
		});
	}
	else{
		$('#formError').fadeIn().text('Please fill out each field before submission');
	}
});

//User can add only one vote to indicate their support for a plan, currently can refresh the page and then upvote again which needs to be fixed
var preClicked=[];
$('.pathsBody').on('click', ".upvoteBtn", function(){
	var upvoteCount=parseInt($(this).siblings('.upTotal').text());
	var category= $('.listHighlight').data('filter');
	var uniqueID = $(this).parents('.userPath').data('uniqueid');
	var justClicked= category+uniqueID;
	// if the user has not already added a vote this session
	if($.inArray(justClicked, preClicked) ==-1){
		upvoteCount++;
		$(this).addClass('upvoted');
		$(this).siblings('.upTotal').text(upvoteCount);
		preClicked.push(justClicked);
		$.ajax({
			type:'POST',
			url: '/addVote',
			headers: { 'Access-Control-Allow-Origin': '*' },
			crossDomain: true,
			data: {myid:uniqueID, votecount:upvoteCount, category:category}
		});
	}
});
