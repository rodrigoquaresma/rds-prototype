(function($) {

  $('#granularity-select').change(function() {
    var values = $(this).val().split(',');
    var reportChangeSelect = $('#data-options');
    var options = reportChangeSelect.find('option');
    for (var i = 0; i < values.length; i++) {
      $(options[i]).val(values[i]);
    }
    reportChangeSelect.change();
  });

})(jQuery);
