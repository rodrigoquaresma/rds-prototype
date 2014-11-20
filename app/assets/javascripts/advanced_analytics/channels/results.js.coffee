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

  $('.funnel-date-picker').on 'change', ->
    splitedDate = $(this).val().split('/')
    month = splitedDate[0]
    year = splitedDate[1]
    add_height_to_container()
    funnels(year, month)
    set_default_drill_down()

  $(document).on 'ajaxSuccess', () ->
    $(".menu-drilldown li").click ->
      self = $(this)
      change_btn_drill_down(self.text())
      add_loading(".channels-results-drilldrown")

  set_default_drill_down = () ->
    $(".btn-drill-down").html('Referral <span class="caret"></span>')

  change_btn_drill_down = (text) ->
    self = $('.btn-drill-down')
    $(self).parents(".btn-group").removeClass("open")
    $(self).html(text + " <span class=\"caret\"></span>")

  add_loading = (klass) ->
    $(klass).html('<div class="loading" style="min-height:300px;">Carregando...</div>')

  add_height_to_container = () ->
    $('.funnel-channels').css("min-height", $('.funnel-channels').height()).html('<div class="loading">Carregando...</div>')

  load_funnel = (url, container) ->
    container = $(container)
    container.html('<div class="loading">Carregando...</div>')
    $.get(url).fail ->
      container.html('<div class="loading">
                        <p>Ops... ocorreu um problema.</p>
                        <p>
                          <button type="button" class="btn btn-default"> Tentar novamente </button>
                        </p>
                      </div>')
      container.find('button').click ->
        load_funnel(url, container)

  funnels = (year, month) ->
    AjaxLoader.load(Routes.analytics_channels_funnel_path({ year: year, month: month }), '.funnel-channels', {
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
    AjaxLoader.load(Routes.analytics_channels_funnel_heading_path({ year: year, month: month }), '.funnel-channels-heading', {
      setLoading: (container, message) ->
        container.html(message)
    })
    AjaxLoader.load(Routes.analytics_channels_drill_down_path({ year, month }), '.channels-results-drilldrown')
    AjaxLoader.load(Routes.analytics_channels_drill_down_menu_path({ year, month }), '.menu-drilldown')
    .success = (url, container, data) ->
      container.html(data)
      container.find('a').click (event) ->
        self = $(this)
        self.parents('.btn-group').find('.dropdown-toggle').html("#{self.text()} <span class=\"caret\"></span>").click()
        AjaxLoader.load(self.attr('href'), '.channels-results-drilldrown')
        false
