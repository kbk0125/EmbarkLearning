$('.segment').click(function(){
	$('.segment').removeClass('chosen')
	$(this).addClass('chosen')
	var data = $(this).data('topic')
	$('.pane').hide(function(){
		$('div[data-pane="'+data+'"]').show()
	})
})