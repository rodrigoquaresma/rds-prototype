//= require datepicker/bootstrap-datepicker
//= require advanced_analytics/helpers/business_helper
//= require advanced_analytics/helpers/date_helper
//= require advanced_analytics/helpers/event_handler_helper

(function($) {
  $(window).load(function(){
    $('iframe[data-src]').attr('src', function() {
      return $(this).data('src');
    });
    $('.report-change-select, .report-filter-group, .report-date-range-filter-group, .report-range-filter-group').change();
  });

  $.station.init.add(function(){
    $('.report-change-btn').click(EventHandler.changeReport);

    $('.update-report-change-select-btn').click(EventHandler.updateReportChangeSelect);

    $('.report-change-select').change(EventHandler.changeReportSelect);

    $('.report-filter-group').change(EventHandler.updateFilter);

    $('.report-date-range-filter-group').change(EventHandler.updateFixedDateRangeFilter);

    $('.report-range-filter-group').change(EventHandler.updateRangeFilter);

    $('.btn input[type="checkbox"]').change( function() {
      self = $(this);
      self.parents('.btn').toggleClass('active', self.is(':checked'))
    });

    $.fn.datepicker.dates['en'] = {
      days: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"],
      daysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
      daysMin: ["Do", "Se", "Te", "Qu", "Qu", "Se", "Sa", "Do"],
      months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      monthsShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      today: "Hoje",
      clear: "Limpar"
    };

    $('.date-picker').datepicker({
      format: "m/yyyy",
      weekStart: 0,
      endDate: DateHelper.formatToMonthAndYear(new Date()),
      startView: 1,
      minViewMode: 1,
      language: "pt-BR",
      todayHighlight: true,
      autoclose: true
    });

    $(".report_full_screen").click(function(){
      var windowFeatures = "menubar=yes,location=no,resizable=yes,scrollbars=yes,status=yes";
      var self = $(this);

      var iframe = Helper.getIFrame(self);
      var url = iframe.prop('src');

      window.open(url, "Full Screen Report", windowFeatures);
    });

    $(".export_report").click(function(){
      var self = $(this);
      var reportFormat = self.data('format');
      var iFrame = Helper.getIFrame(self);
      var reportId = Helper.getReportId(iFrame);

      $.bootstrapGrowl("Processando relatório...", {
        type: 'info',
        width: 600,
        delay: false,
        allow_dismiss: false,
      });

      $.post(Routes.analytics_report_export_path(), { report_id: reportId, report_format: reportFormat })
      .done(function(data){
        $('<iframe>').attr('src', data).attr("class", "hide").appendTo('body');
        $(".bootstrap-growl").remove();
      });
    });
  });

})(jQuery);
