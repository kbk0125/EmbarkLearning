$('.corner').click(function(){
	$(this).parents('.page').hide()
	$('.page2').show();
})

$('.corner2').click(function(){
	$(this).parents('.page').hide()
	$('.page').first().show();
})