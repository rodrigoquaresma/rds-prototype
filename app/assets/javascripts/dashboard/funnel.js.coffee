jQuery ->
  $('#goals').on 'shown.bs.modal', () ->
    $.get Routes.edit_funnel_setups_path(), (data) ->
      $('#goals .modal-body').html(data)

  $('#save-funnel-setup').on 'click', () -> $('#funnel-setup-form').submit()

class FunnelData
  load: ->
    window.deferred = $.Deferred();

    me = this
    $.when(
      $.get(Routes.dashboard_load_dashboard_path()).done (data) =>
         this.load_visitors(data) if $('#visitors_total').size() == 1
         this.load_leads(data) if $('#leads_total').size() == 1
         this.load_qualified_leads(data) if $('#qualified_leads_total').size() == 1
         this.load_opportunities(data) if $('#opportunities_total').size() == 1
         this.load_sales(data) if $('#sales_total').size() == 1
    ).then () ->
      me.calculate_percentages()
      conversions = $(".conversion")
      $(conversions[conversions.length - 1]).hide()
      window.deferred.resolve() if window.googleChartLoaded

  runChartCallbacks: ->
    window.googleChartLoaded = true
    window.deferred.resolve()

  load_visitors: (data) ->
    #console.log 'Loading visitors funnel data...'
    $('#visitors_total').text(I18n.toNumber(data.visitors.current_month_value, {precision: 0}))
    $('#visitors_delta').html(this.variation_html(data.visitors.current_month_value,data.visitors.last_month_value))

    if data.visitors.graphics
      this.goal_comparison("#visitors_goal_delta", data.visitors.current_month_value,this.goal_of_day(data.visitors.graphics.data_rows))
      window.deferred.done =>
        this.plot_graphic(data.visitors.graphics, 'chart_visitors')

  load_leads: (data) ->
    #console.log 'Loading leads funnel data...'
    $('#leads_total').text(I18n.toNumber(data.leads.current_month_value, {precision: 0}))
    $('#leads_delta').html(this.variation_html(data.leads.current_month_value,data.leads.last_month_value))

    if data.leads.graphics
      this.goal_comparison("#leads_goal_delta", data.leads.current_month_value,this.goal_of_day(data.leads.graphics.data_rows))
      window.deferred.done =>
        this.plot_graphic(data.leads.graphics, 'chart_leads')

  load_qualified_leads: (data) ->
    #console.log 'Loading qualified leads funnel data...'
    $('#qualified_leads_total').text(I18n.toNumber(data.qualified_leads.current_month_value, {precision: 0}))
    $('#qualified_leads_delta').html(this.variation_html(data.qualified_leads.current_month_value,data.qualified_leads.last_month_value))

    if data.qualified_leads.graphics
      this.goal_comparison("#qualified_leads_goal_delta", data.qualified_leads.current_month_value,this.goal_of_day(data.qualified_leads.graphics.data_rows))
      window.deferred.done =>
        this.plot_graphic(data.qualified_leads.graphics, 'chart_qualified_leads')

  load_opportunities: (data) ->
    #console.log 'Loading opportunity funnel data...'
    $('#opportunities_total').text(I18n.toNumber(data.opportunities.current_month_value, {precision: 0}))
    $('#opportunities_delta').html(this.variation_html(data.opportunities.current_month_value,data.opportunities.last_month_value))
  
    if data.opportunities.graphics
      this.goal_comparison("#opportunities_goal_delta", data.opportunities.current_month_value,this.goal_of_day(data.opportunities.graphics.data_rows))
      window.deferred.done =>
        this.plot_graphic(data.opportunities.graphics, 'chart_opportunities')

  load_sales: (data) ->
    #console.log 'Loading sales funnel data...'
    $('#sales_total').text(I18n.toNumber(data.sales.current_month_value, {precision: 0}))
    $('#sales_delta').html(this.variation_html(data.sales.current_month_value,data.sales.last_month_value))

    if data.sales.graphics
      this.goal_comparison("#sales_goal_delta", data.sales.current_month_value,this.goal_of_day(data.sales.graphics.data_rows))
      window.deferred.done =>
        this.plot_graphic(data.sales.graphics, 'chart_sales')

  plot_graphic: (json_data, target_div) ->
    data = new google.visualization.DataTable()
    data.addColumn('string', 'Dia')
    data.addColumn('number', json_data.current_month)
    data.addColumn('number', json_data.last_month)
    data.addColumn('number', 'Meta')
    data.addRows(json_data.data_rows)
    formatter = new google.visualization.NumberFormat({fractionDigits: 0})
    formatter.format(data, 3)
    chart = new google.visualization.AreaChart(document.getElementById(target_div))
    options = {
      width: 590,
      height: 140,
      backgroundColor: 'transparent',
      series: {
        0:{
          color: '#846d50',
          visibleInLegend: false,
          pointSize: 4,
          lineWidth: 2
          },
        1:{
          color: '#BCBCBC',
          visibleInLegend: false,
          pointSize: 1,
          lineWidth: 0
        },
        2:{
          color: '#3A87AD',
          visibleInLegend: false,
          pointSize: 0,
          lineWidth: 1
        }
      },
      vAxis: {
        gridlineColor: '#E8E8E4',
        format: '#.###'
      }
    }

    chart.draw(data, options)

  goal_of_day: (data_rows) ->
    goal = 0
    for row in data_rows
      break if row[1] == null
      goal = row[3]
    goal

  percentage: (base, value) ->
    if base==0 || value==0
      percent = '0 %'
    else
      percent = ((value * 100)/ base).toFixed(2)

    return if isNaN(percent) then "0 %" else I18n.toNumber(percent, {precision: this.calculate_precision(percent)}) + " %"

  calculate_precision: (percent) ->
    return if percent.toString().split(".")[1] == "00" then 0 else 1

  calculate_percentages: ->
    #console.log 'Calculating funnel percentages...'
    percentages = $('section .conversion')
    values = []
    $('section .counter').each (index,element) =>
      values.push(parseInt $(element).text().replace(".",""))

    percentages.each (index, element) =>
      $(element).text(this.percentage(values[index], values[index+1]))

  goal_comparison: (element, current, target) ->
    if target == null || target == 0
      $(element).closest('.col-xs-2').find('.label-goal').addClass("disabled")
      $(element).addClass("disabled")
      $(element).html("<p class=\"\"><i class=\"xicon\"></i>-</p>")
      return

    $(element).html(this.variation_html(current, target))

  variation_html: (current,last) ->
    if last == null
      return "<p class=\"up\"><i class=\"xicon-arrow1-up\"></i>+#{current}</p>"
    if current == null
      return "<p class=\"\"><i class=\"xicon\"></i>0%</p>"

    current = parseInt current
    last = parseInt last
    if(current > last)
      diff = I18n.toNumber(current - last, {precision: 0})
      diff_perc = (( current - last ) / last * 100)
      v = "+#{diff}"
      if isFinite(diff_perc)
        v = "+#{diff} (#{I18n.toNumber(diff_perc, {precision: this.calculate_precision(diff_perc)})}%)"

      return "<p class=\"up\"><i class=\"xicon-arrow1-up\"></i>#{v}</p>"
    else if(current < last)
      diff = I18n.toNumber(current - last, {precision: 0})
      diff_perc = (parseFloat(Math.abs(current - last)) / last * 100)
      v = "#{diff}"
      if isFinite(diff_perc)
        v = "#{diff} (#{I18n.toNumber(Math.abs(diff_perc), {precision: this.calculate_precision(diff_perc)})}%)"
      return "<p class=\"down\"><i class=\"xicon-arrow1-down\"></i>#{v}</p>"
    else
      return "<p class=\"\"><span i=\"xicon\"></i>0%</p>"

window.funnelData = new FunnelData()
window.funnelData.load();

$(window).load => google.load('visualization', '1', {'packages':['corechart'], "callback" : window.funnelData.runChartCallbacks})

# export to be accessible outside coffee wrappers
(exports ? this).FunnelData = FunnelData
