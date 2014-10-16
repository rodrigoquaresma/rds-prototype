#= require jquery.ui.datepicker
#= require jquery.ui.datepicker-pt-BR

jQuery ->
	$.station.datepickerHelper =
		init: ->
			jsDay = parseInt $('#campaign_send_at_3i').val()
			jsMonth = parseInt($('#campaign_send_at_2i').val(), 10) - 1
			jsYear = parseInt $('#campaign_send_at_1i').val()
			
			helper = $( ".date-picker" ).datepicker
				dateFormat: 'dd/mm/yy',
				dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
				dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
				monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
				prevText: 'Anterior',
				nextText: 'Próximo',
				minDate: +0,
				onSelect: EventHandler.datepickerChange # syncrhonize datetime_select with datepicker visual component
			helper.datepicker('setDate', new Date(jsYear, jsMonth, jsDay))

	EventHandler =
		datepickerChange: (dateText, inst) ->
			$('#campaign_send_at_3i').val(inst.selectedDay)
			$('#campaign_send_at_2i').val(inst.selectedMonth + 1)
			$('#campaign_send_at_1i').val(inst.selectedYear)
			$('#campaign_send_at_3i').trigger('change')
