jQuery ->
  $.get Routes.analytics_report_fetch_leads_count_by_season_path(), (data) ->
    $('#entry-in').change ->
      count = data[$(this).val()]
      $('#leads_count').text(count ? count : '-')
    .change()
