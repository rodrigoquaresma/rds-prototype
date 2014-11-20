#= require ajax_loader

jQuery ->
  if $('#leads_count').length > 0
    AjaxLoader.load(Routes.analytics_report_fetch_leads_count_by_season_by_channel_path(), '#leads_count', {
      setLoading: (container, message) ->
        container.text(message)
      nocontent: (url, container, data, options) ->
        container.html('-')
      error: (url, container, data, options) ->
        container.html('-')
    }).success = (url, container, data) ->
      $('#entry-in, .js-channel').change ->
        count = data[$('#entry-in').val()][$('.js-channel').val()]
        count ||= '0'
        container.text(count)
      .change()
