#= require ajax_loader

jQuery ->
  AjaxLoader.load(Routes.analytics_report_fetch_leads_count_by_season_by_channel_path(), '#leads_count', {
    setLoading: (container, message) ->
      container.text(message)
  }).success = (url, container, data) ->
    $('#entry-in, .js-channel').change ->
      count = data[$('#entry-in').val()][$('.js-channel').val()]
      container.text(count ? count : '-')
    .change()
