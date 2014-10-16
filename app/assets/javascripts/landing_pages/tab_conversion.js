(function($){
	$.station.init.add(function(){
		var toggleFieldTrigger = $('[data-form-toggle]'),
		toggleSelectedField = function() {
			var selectedFieldValue = $(this).data("form-toggle"),
			fieldSelector = $(selectedFieldValue);
			fieldSelector.slideToggle(300);
		}
		toggleFieldTrigger.on('change', toggleSelectedField);
	});
})(jQuery);
