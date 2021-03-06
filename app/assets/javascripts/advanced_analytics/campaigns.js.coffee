#= require advanced_analytics/advanced
#= require advanced_analytics/funnel
#= require ajax_loader

jQuery ->
  $ ->
    load_conversions()

    $('.js-stage-name-select, .js-conversion-mode-change, .input-daterange input[type="text"]').on 'change', load_conversions

  $(document).on 'ajaxComplete', () ->
    $('.js-sort-by, .js-limit').change () ->
      load_conversions()
    $('.js-campaigns-export-csv').click () ->
      params = parse_parameters()
      return unless params.start_date && params.end_date
      params.format = 'csv'
      window.location = Routes.analytics_campaigns_conversions_data_path(params)

  load_conversions = () ->
    params = parse_parameters()
    return unless params.start_date && params.end_date
    AjaxLoader.load(Routes.analytics_campaigns_conversions_data_path(params), '.js-conversions-table', {
      nextLoadingMessageIndex: AjaxLoader.stopInLastMessage
      loadingMessages: [
        'Carregando',
        'Carregando.',
        'Carregando..',
        'Carregando...',
        'Ainda estamos carregando',
        'Ainda estamos carregando.',
        'Ainda estamos carregando..',
        'Ainda estamos carregando...',
        'Este relatório pode demorar até alguns minutos',
        'Este relatório pode demorar até alguns minutos.',
        'Este relatório pode demorar até alguns minutos..',
        'Este relatório pode demorar até alguns minutos...',
        'São muitos dados para processar, desculpe o inconveniente',
        'São muitos dados para processar, desculpe o inconveniente.',
        'São muitos dados para processar, desculpe o inconveniente...',
        'São muitos dados para processar, desculpe o inconveniente....',
        'Já estamos trabalhando para melhorar este tempo'
      ]
    })

  parse_parameters = () ->
    {
      start_date: $('#start_date').val()
      end_date: $('#end_date').val()
      stage_name: $('.js-stage-name-select').val()
      conversion_mode: $('.js-conversion-mode-change').val()
      sort_by: $('.js-sort-by').val()
      limit: $('.js-limit').val()
    }
