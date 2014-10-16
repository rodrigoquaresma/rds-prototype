//= require jquery.ui.datepicker
//= require jquery.ui.datepicker-pt-BR


(function($){
	'use strict';

	$.station.init.add(function(){
		$('#message-dialog').off('.rd-socialmediapost')
							.on('click.rd-socialmediapost','#schedule-message', EventHandler.enableScheduleInputs)
							.on('click.rd-socialmediapost','#send-message', EventHandler.disableScheduleInputs);
	});

	$.station.datepickerHelper = {
		init : function() {
			var jsDay = window.parseInt( $('#post_send_at_3i').val() );
			var jsMonth = window.parseInt( $('#post_send_at_2i').val() , 10 ) -1;
			var jsYear = window.parseInt( $('#post_send_at_1i').val() );

			$( ".date-picker" ).datepicker({
				dateFormat: 'dd/mm/yy',
				dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
				dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
				monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
				prevText: 'Anterior',
				nextText: 'Próximo',
				minDate: +0,
				onSelect: EventHandler.datepickerChange //syncrhonize datetime_select with datepicker visual component
			}).datepicker('setDate', new Date(jsYear, jsMonth, jsDay) );
		}
	};

	var EventHandler = {
		datepickerChange : function (dateText, inst) {
			$('#post_send_at_3i').val(inst.selectedDay);
			$('#post_send_at_2i').val(inst.selectedMonth + 1);
			$('#post_send_at_1i').val(inst.selectedYear);
		},

		enableScheduleInputs : function(event) {
			var jqLink = $(this).next('span');
			$('#schedule-options-panel .date-picker, #schedule-options-panel #post_send_at_4i, #schedule-options-panel #post_send_at_5i').removeAttr('disabled');
			$('#schedule-options-panel .date-picker-icon').removeClass('disabled');
			$('#schedule-options-panel span').removeClass('disabled');
			$("#message-submit-button").val('Agendar');
		},

		disableScheduleInputs : function(event) {
			var jqLink = $(this);
			$('#schedule-options-panel .date-picker, #schedule-options-panel #post_send_at_4i, #schedule-options-panel #post_send_at_5i').attr('disabled', 'disabled');
			$('#schedule-options-panel .date-picker-icon').addClass('disabled');
			$('#schedule-options-panel span').addClass('disabled');
			$('#message-submit-button').val('Enviar agora');
		},
	}
})(jQuery);
