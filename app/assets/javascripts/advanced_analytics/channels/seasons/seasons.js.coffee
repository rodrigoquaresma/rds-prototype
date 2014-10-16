jQuery ->
  $.get Routes.analytics_report_fetch_leads_count_by_season_by_channel_path(), (data) ->
    $('#entry-in').change ->
      count = data[$(this).val()][$('.js-channel').val()]
      $('#leads_count').text(count ? count : '-')
    .change()
