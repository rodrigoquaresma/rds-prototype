#= require advanced_analytics/advanced
#= require advanced_analytics/funnel
#= require ajax_loader

jQuery ->
  $ ->
    today = new Date()
    year = today.getFullYear()
    month = today.getMonth()
    if $('.business-results').length > 0
      funnels(year, month)

  $('.funnel-date-picker').change ->
    splitedDate = $(this).val().split('/')
    month = splitedDate[0]
    year = splitedDate[1]
    add_height_to_container()
    funnels(year, month)

  load_funnel = (url, klass) ->
    $.ajax
     url: url
     error: () ->
       $(klass).html('<div class="loading"><p>Ops... ocorreu um problema.</p> <p><a class="btn btn-default" href="'+Routes.analytics_business_results_path()+'"> Tentar novamente</a></p></div>')

  add_height_to_container = () ->
    $('.funnel-business').css("min-height", $('.funnel-business').height())
    $('.funnel-indicators').css("min-height", $('.funnel-indicators').height())

  funnels = (year, month) ->
    AjaxLoader.load(Routes.analytics_business_selected_date_path({ year, month }), ".selected_date")
    AjaxLoader.load(Routes.analytics_business_funnel_path({ year, month }), ".funnel-business")
    AjaxLoader.load(Routes.analytics_business_indicators_path({ year, month }), ".funnel-indicators")
