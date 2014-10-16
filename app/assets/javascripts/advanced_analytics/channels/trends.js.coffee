#= require advanced_analytics/advanced
#= require advanced_analytics/funnel

jQuery ->

  $(".js-channel-options").change ->
    self = $(this).find(":selected")
    reports = $(self).data('report-ids').split(",")
    for btn, i in $('.js-report-change-ids')
      $(btn).data('report-id', reports[i % reports.length])

    if self.val() == "Todos"
      $('.js-channel-legend').show()
      $(".js-channel-legend .checkbox:contains('Orgânico') input").prop('checked', true).parents(".checkbox").parent().addClass("active")
    else
      disable_legend(self)
    $(".report-filter-group").change()
    $('.js-report-change-ids.active').click()

  disable_legend = (self) ->
    $('.js-channel-legend').hide()
    $(".js-channel-legend :checked").prop('checked', false).parents(".active").removeClass("active")
