#= require ajax_loader

jQuery ->
  AjaxLoader.load(Routes.analytics_report_fetch_leads_count_by_season_path(), '#leads_count', {
    setLoading: (container, message) ->
      container.text(message)
  }).success = (url, container, data) ->
    $('#entry-in').change ->
      count = data[$(this).val()]
      container.text(count ? count : '-')
    .change()
