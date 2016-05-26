var topLvData;
var activeCat;
var activeSub;

var imgHash= {
	"article": "<i class='fa fa-list-alt' aria-hidden='true'></i>",
	"video": "<i class='fa fa-video-camera' aria-hidden='true'></i>",
	"course": "<i class='fa fa-graduation-cap' aria-hidden='true'></i>",
	"practical": "<i class='fa fa-pencil' aria-hidden='true'></i>",
	"book": "<i class='fa fa-book' aria-hidden='true'></i>",
}

$.get('/voteTotal', function (votes){
	//since using WITH ROLLUP, do not count summary
	for (var i= 0; i <votes.length-1; i++){
		var container = $('.selectRow').find("[data-category='"+votes[i].category+"']");
		$(container).children('.links').text(votes[i].linkTot+' Total Tutorials');
	}
});

$('.next').click(function(){
	$(this).parents('.ctrBlock').hide('slide');
	var category= $(this).data('category');
	activeCat=category;
	var activeBlock= $('.ctrBlock2');
	$.get('/catOptions', {category:category}, function(data){
		topLvData = data;
		$(activeBlock).show('slide').css('display', 'flex')
		fillImage(1)
		for(var key in data){
			if (data.hasOwnProperty(key)) {
				createListing(activeBlock, data[key], key)
			}
		}
	})
});

function createListing(blockParent, subcat, key){
	var keyDiv= $(blockParent).children('.subCatList')
	var title = '<h3>'+subcat['short']+'</h3>';
	var description= '<p>'+subcat['summary']+ '</p>';
	var chooseBtn= '<div class="actionBtn2" data-subcat="'+key+'">Select</div>'
	var imgDiv = '<div class="imgContain"><img src="'+subcat["img"]+'" /></div>'
	var listing='<div class="listing">'+chooseBtn+imgDiv+'<div class="content">'+title+description+'</div></div>'
	keyDiv.append(listing)
}

function fillImage(num) {
	var keyImg= $('.imgHold').eq(num)
	var stem= $(keyImg).data('stem')
	$(keyImg).children('p').addClass('highlight')
	$(keyImg).children('img').fadeOut(function(){
		$(keyImg).children('img').attr('src', '/img/'+stem+'full.png').fadeIn()
	})
}

function createHeader(data){
	console.log(data)
	var title= '<div><img src="'+data.img+'" /><h2>How to learn '+data.short+'</h2></div>';
	var sub= '<p class="sub">'+data.summary+'</p>';

	var reqString= '<p> First, you gotta know... </p>';
	for(var i=0; i<data.reqs.length; i++){
		var req= '<div class="req"><img src="/img/lineimg'+(i+1)+'.png" ><p>'+data.reqs[i]+'</p></div>'
		reqString += req
	}
	var wholeDiv = title+sub+'<div class="box">'+reqString+'</div>';
	$('.headCont').append(wholeDiv);
}

function addSections(begin, inter){
	console.log(begin)
	console.log(inter)

	var beginContent='';
	for(var i=0; i< begin.length; i++){
		var head= '<p class="title">'+begin[i].title+'</p>';
		var link= '<a href="'+begin[i].link+'" target="_blank">';
		var exp= '<p class="desc">'+begin[i].description+'</p>';
		var imgDiv= '<div class="corner">'+imgHash[begin[i].filter]+'</div>';
		if(begin[i].votes > 5)
			var rating= '<p class="high"> Top Rated! </p>'
		else
			var rating= '<p class="high"></p>'
		var entry= '<div class="entry">'+link+head+'</a>'+exp+imgDiv+rating+'</div>';
		beginContent+=entry;
	}

	$('.begin').children('.contSection').append(beginContent);

	var challenge='<p class="chal">'+topLvData[activeSub].challenge1.short+'</p><p class="chalDesc">'+topLvData[activeSub].challenge1.full+'</p>'

	$('.challenge').find('.contSection').append(challenge);

	var interContent='';

	for(var i=0; i< inter.length; i++){
		var head= '<p class="title">'+inter[i].title+'</p>';
		var link= '<a href="'+inter[i].link+'" target="_blank">';
		var exp= '<p class="desc">'+inter[i].description+'</p>';
		var imgDiv= '<div class="corner">'+imgHash[inter[i].filter]+'</div>';
		if(inter[i].votes > 5)
			var rating= '<p class="high"> Top Rated! </p>'
		else
			var rating= '<p class="high"></p>'
		var entry= '<div class="entry">'+link+head+'</a>'+exp+imgDiv+rating+'</div>';
		interContent+=entry;
	}

	$('.inter').children('.contSection').append(interContent);
}

$('.subCatList').on('click', '.actionBtn2', function(){
	activeSub= $(this).data('subcat')
	$(this).parents('.ctrBlock').hide('slide');
	var activeBlock= $('.ctrBlock3');
	$(activeBlock).show('slide').css('display', 'flex')
	fillImage(2)
})

$('.getRes').click(function(){
	var tutChoices=[]
	$('input[name="check"]:checked').map(function() { return tutChoices.push(this.value); });

	fillImage(3)
	if(tutChoices.length){

		$(this).parents('.ctrBlock').hide('slide');
		var activeBlock= $('.ctrBlock4');
		$(activeBlock).show('slide').css('display', 'flex')
		
		$('.bottomRow').addClass('vert')
		$.get('/customTut', {category:activeCat, subcat:activeSub, choices: tutChoices}, function(data){


			createHeader(topLvData[activeSub])
			addSections(data[0], data[1])
		})
	}

	else {
		$('.errMsg').show(function(){
			setTimeout(function(){
				$('.errMsg').hide()
			}, 1000)
		})
	}
})

$('.restart').click(function(){
	window.location.reload()
})