/* global jQuery */

(function ($){
	'use strict';
	$.station.init.add(function(){
		$('#add-user-form').fadeOut();
		$('.add-link-button').bind('click', ConfigEventHandler.addUser);
		$('.hide-form-link').bind('click', ConfigEventHandler.hideForm);
		$('.add-account-user .btn-default').bind('click', ConfigEventHandler.addUserByEmail);
	});

	var ConfigEventHandler = {
		addUser : function(){
			var jqThis = $(this);
			jqThis.fadeOut('fast', function(){
				$('#add-user-form').show();
			});
			return false;
		},
		addUserByEmail : function() {
			var email = $('#email');
			if (email.is(':invalid')) {
				$.bootstrapGrowl("Email inválido.",
								 { type: 'danger', width: 600 });
				email.addClass('error');
				return false;
			} else {
				email.removeClass('error');
			}
		},
		hideForm : function(){
			$('#add-user-form').fadeOut('fast', function(){
				$('.add-link-button').show();
			});
			return false;
		}
	};

})(jQuery);
