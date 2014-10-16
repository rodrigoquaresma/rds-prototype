/* global jQuery */

(function($){
	$.station.init.add(function(){
		$('.connect-button-google').on('click', EventHandler.confirmBeforeContinue);
		$('.connect-button-facebook').on('click', EventHandler.confirmBeforeContinue);
		$('.connect-button-twitter').on('click', EventHandler.confirmBeforeContinue);
		//add facebook and twitter
	});

	var EventHandler = {
		confirmBeforeContinue : function(event){
			var confirmText = $(this).data('confirmText');
			if (confirmText && !window.confirm(confirmText)){
				return false; 
			}
		}
	};

})(jQuery);