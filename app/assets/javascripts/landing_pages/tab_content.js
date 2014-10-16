(function($){
	$.station.init.add(function(){
		$('.edit-spam-statement').bind('click', EventHandler.showEditSpamStatement);
	});
	var EventHandler = {
		showEditSpamStatement : function(event){
			$('#spam_statement_msg').toggleClass('hide');
			$('#spam_statement_edit').toggleClass('hide');
			$('#spam_statement_alert').toggleClass('hide');
		}
	};

})(jQuery);
