#= require advanced_analytics/advanced
#= require advanced_analytics/funnel
#= require ajax_loader

jQuery ->
  $(document).on 'ready', () ->
    today = new Date()
    year = today.getFullYear()
    month = today.getMonth()
    funnels(year, month)

  $('.funnel-date-picker').change ->
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

  load_funnel = (url, container, year, month) ->
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
        load_funnel(url, container, year, month)

  funnels = (year, month) ->
    load_funnel(Routes.analytics_channels_funnel_path({ year, month }), '.funnel-channels', year, month)
    load_funnel(Routes.analytics_channels_drill_down_path({ year, month }), '.channels-results-drilldrown', year, month)
