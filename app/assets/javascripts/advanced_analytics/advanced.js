//= require datepicker/bootstrap-datepicker
//= require bootstrap-datepicker.pt-BR
//= require advanced_analytics/helpers/business_helper
//= require advanced_analytics/helpers/date_helper
//= require advanced_analytics/helpers/event_handler_helper

(function($) {
  $(window).load(function(){
    $('iframe[data-src]').attr('src', function() {
      return $(this).data('src');
    });
    $('.report-change-select, .report-filter-group, .report-date-range-filter-group, .report-range-filter-group').change();

    $('.report-change-btn').on('click', EventHandler.changeReport).filter('.active').click();

    $('.update-report-change-select-btn').on('click', EventHandler.updateReportChangeSelect).filter('.active').click();

    $('.report-change-select').on('change', EventHandler.changeReportSelect).change();

    $('.report-filter-group').on('change', EventHandler.updateFilter).change();

    $('.report-date-range-filter-group').on('change', EventHandler.updateFixedDateRangeFilter).change();

    $('.report-range-filter-group').on('change', EventHandler.updateRangeFilter).change();

    $('.btn input[type="checkbox"]').on('change', function() {
      self = $(this);
      self.parents('.btn').toggleClass('active', self.is(':checked'))
    }).change();

    $('.date-picker').datepicker({
      format: "m/yyyy",
      weekStart: 0,
      endDate: DateHelper.formatToMonthAndYear(new Date()),
      startView: 1,
      minViewMode: 1,
      language: "pt-BR",
      todayHighlight: true,
      autoclose: true
    }).on('keydown', function(e) {
      // prevent manual input
      e.preventDefault();
    });

    $(".report_full_screen").on('click', function(){
      var windowFeatures = "menubar=yes,location=no,resizable=yes,scrollbars=yes,status=yes";
      var self = $(this);

      var iframe = Helper.getIFrame(self);
      var url = iframe.prop('src');

      window.open(url, "Full Screen Report", windowFeatures);
    });

    $(".export_report").on('click', function(){
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
