/* global tinymce:true, jQuery:true */
(function($){
	$.station.init.add(function(){
		$('[data-bgclass]').focusThumb({
			thumbSelector : '#thumb-landing_page-image',
			eventType : 'both'
		});
		$('#sidebar').sticky({topSpacing:53});
		$('#loadLandingPagePreview').click(EventHandler.submitPreviewForm);
		var tinyMCE = new TinyMCEWrapper();
		tinyMCE.init();
	});
	var EventHandler = {
		submitPreviewForm : function(e){
			if (typeof(tinyMCE) != 'undefined') {
				tinyMCE.triggerSave();
			}
			var clone = $('form').find('input, textarea').clone();
			$('#hidden_input-landing_page-container').empty().append( clone );
			$('#preview-landing_page-container').trigger('submit');
			//remove novamente os campos do DOM após submit para não conflitar IDs
			$('#hidden_input-landing_page-container').empty();
			e.preventDefault();
		}
	};
})(jQuery);
