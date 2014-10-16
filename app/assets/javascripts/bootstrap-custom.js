function setupBootstrapCustomizations() {
  var popovers = $('[data-toggle="popover"]');
  popovers.popover({
    trigger: 'click',
    animation: true
  });

  $('body').on('click', function (e) {
    $('[data-toggle="popover"]').each(function () {
      if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
        $(this).popover('hide');
      }
    });
  });

  var tooltips = $('[data-toggle="tooltip"]');
  tooltips.tooltip({
    trigger: 'hover',
    animation: true
  });
}

(function ($){
  setupBootstrapCustomizations();
})(jQuery);