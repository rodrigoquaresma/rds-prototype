//= require datepicker/bootstrap-datepicker
//= require bootstrap-datepicker.pt-BR

	$(document).ready(function (){
		ReportFeatures.init();
	});

	var ReportFeatures = {
		init : function(){
			this.ReportsEventHandler();

			$('.date-picker').datepicker({
			    format: "dd/mm/yyyy",
			    language: "pt-BR"
			});

			$('#dias').change(function (){
				window.location.href="?dias="+$(this).val();
			});

			$('#intervalo').change();
			$('#data-options').change();
		},

		ReportsEventHandler : function(){
			$('a.open-options-link').bind('click', ReportFeatures.openOptionsModal);
			$('a.close-options-link').bind('click', ReportFeatures.closeOptionsModal);
			$('#intervalo').bind('change', ReportFeatures.setCustomInterval);
			$('.granularity-list a').bind('click', ReportFeatures.changeGranularity);
			$('#data-options').bind('change', ReportFeatures.changeDataOptions);
			$('a.terms-visibility-link').bind('click', ReportFeatures.toggleTermsVisibility);
			$('#interval').bind('change', ReportFeatures.changeInterval);

		},

		openOptionsModal : function() {
			$('.interval-options-modal > div').fadeToggle('fast');
			return false;
		},
		closeOptionsModal : function() {
			$('.interval-options-modal > div').fadeOut('fast');
			return false;
		},
		toggleTermsVisibility : function() {
			var jqThis = $(this);
			var pointer = $(this).find('span');
			pointer.toggle();
			var terms = jqThis.parents('article').find('div');
			terms.slideToggle('fast');
			return false;
		},

		setCustomInterval : function() {
			var jqThis = $(this);
			var checkCustom = jqThis.val();
			if (checkCustom == 'custom'){
				$('.custom-interval-form').removeClass('disabled');
			} else {
				$('.custom-interval-form').addClass('disabled');
				var selected = jqThis.find('option:selected');
				$('#start_date').val(selected.data('start-date'));
				$('#end_date').val(selected.data('end-date'));
				$('#granularity').val(selected.data('granularity'));
			}
		},

		changeGranularity : function() {
			var jqThis = $(this);
			$('.granularity-list a').removeClass('active');
			jqThis.addClass('active');
			$('#granularity').val(jqThis.attr('data-value'));
			return false;
		},

		changeDataOptions : function (e) {
			var $leads_graphic_container = $('#chart_traffic_sources_leads');
			var $visitors_graphic_container = $('#chart_traffic_sources_visitors');
			var $customers_graphic_container = $('#chart_traffic_sources_customers');
			var $target = $(e.target);

			if ($target.val() === 'leads') {

				$leads_graphic_container.show();
				$visitors_graphic_container.hide();
				$customers_graphic_container.hide();
			} else if ($target.val() === 'customers') {
				$leads_graphic_container.hide();
				$visitors_graphic_container.hide();
				$customers_graphic_container.show();
			} else {
				$leads_graphic_container.hide();
				$visitors_graphic_container.show();
				$customers_graphic_container.hide();
			}

			var optionLabel = $target.find('option[value=' + $target.val() + ']').html();
			$('.graphic-title').html(optionLabel);

		},

		drawChart: function (chartData) {
			var chartContainer = $('#chart_traffic_sources').get(0);
			var chart = new google.visualization.ColumnChart(chartContainer);
			chart.draw(chartData, {
				'isStacked': true,
				legend: { position: 'none' },
				width: 745,
				height: 210,
				chartArea:{ width: '90%', height: '80%' },
				backgroundColor: '#ffffff',
				colors:[ '#A58AC0', '#DB8989', '#718f99', '#87a579', '#e4d17a', '#d07c2a'],
				vAxis: {
					gridlineColor: '#d4d4d4',
					textStyle:{ color: '#463a33'},
					baselineColor: '#463a33'
				},
				hAxis: { textStyle:{ color: '#463a33'} }
			});
		},

		changeInterval : function (){
			window.location.href = $(this).val();
		},

		renderLeadData : function(data){
			for ( var x in data ){
				$('.leads[data-type="'+x+'"]').html(data[x]);

				var visits = parseInt( $('td.visits[data-type="'+x+'"]').text(), 10 );
				var leads = data[x];
				var percentage = '0%';

				if ( visits ){
					percentage = ( !isNaN(visits) && !isNaN(leads) ) ? (Math.round(( leads / visits )*100)) + '%' : '0%' ;
				}

				$('.percentage[data-type="'+x+'"]').html( percentage );

			}
		}
	};
