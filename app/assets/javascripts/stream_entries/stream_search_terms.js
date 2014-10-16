/*global jQuery */
(function ($){
	$.station.init.add(function(){

		//bind events
		$('.add-link-button').on('click', SearchTermsEventHandler.showAddItemForm);
		$('.close-form-link').on('click', SearchTermsEventHandler.closeForm);

		//events for elements that dont exists on DOM Ready but will be created
		$('body').off('.rd-streamsearchterms') //unbind to avoid multiple calls
				.on('click.rd-streamsearchterms', '.close-dialog-link', SearchTermsEventHandler.closeDialog);
	});

	var SearchTermsEventHandler = {
		showAddItemForm : function (event){
			var jqLink = $(this);
			$(this).fadeOut('fast', function() {
				$('#add-item-form').fadeIn().find('input[type=text]:first').focus().val('');
			});
			return false;
		},


		closeDialog :function(event){
			$("#edit_term-dialog").modal('hide');
			return false;
		},

		closeForm :function(event){
			var jqLink = $(this);
			$('#add-item-form').fadeOut('', function() {
				$(this).prev('a').fadeIn();
			});
			return false;
		},
	};
})(jQuery);
