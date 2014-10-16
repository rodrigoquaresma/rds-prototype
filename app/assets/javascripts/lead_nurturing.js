//= require jquery.tmpl.min
//= require jquery.validate.js
//= require jquery_nested_form
//= require jquery.action_menu
//= require lead_nurturing/form_controller
//= require lead_nurturing/list_controller

(function ($){

	$(document).ready(function(){

		WorkflowEventHandler.updateWorflowActivation();

		$(".button-activation-flow").click(function (data) {
	    var btn = $(this)
			var btnText = $(btn).children('.button-text')
			var btnTextActivate = $(btn).children('.button-text.activate-text')
			var btnTextActive = $(btn).children('.button-text.active-text')
			$.ajax({
			  type: "POST",
			  url: $(btn).data('toggle-url'),
			  dataType: 'script'
			}).always(function () {
				$(btn).button('reset')
				$(btn).toggleClass('active');
				$(btn).toggleClass('btn-success');
				$(btn).toggleClass('btn-default');
				$(btnText).fadeOut('fast');
				$(btn).attr('data-hover','off');
				$(btn).mouseleave(function() {
				  $(btn).attr('data-hover','on');
				});
				if ($(btn).hasClass('active')) {
					$(btnTextActivate).fadeIn('fast');
			  } else {
					$(btnTextActive).fadeIn('fast');
			  };
			});
		});

		$('.label-activation-flow input:checkbox').live('change', WorkflowEventHandler.updateWorflowActivation);

	});
	var WorkflowEventHandler = {
		updateWorflowActivation : function(event){
			if($('.label-activation-flow input:checkbox').is(":checked")) {
				$('.label-activation-flow').addClass("active");
			} else {
				$('.label-activation-flow').removeClass("active");
			}
		}
	};
})(jQuery);
