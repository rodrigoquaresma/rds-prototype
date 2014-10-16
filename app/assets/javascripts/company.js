//= require jquery.timeago
//= require jquery-timeago/locales/jquery.timeago.pt-br
//= require company/autocomplete
//= require company/merge_company

$(function(){
	$('time.timeago').timeago();
	
	$('#save-btn').on('click', function(){
		var form = $(this).parents('form');
		
		$.ajax({
			url: form.attr('action'),
			type: 'PUT',
			dataType: 'script',
			data: form.serialize()
		});
	});
});