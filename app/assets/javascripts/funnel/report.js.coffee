#= require jquery.mask.min

jQuery ->
  window.funnelReport = new FunnelReport()
  window.funnelStageCosts = new FunnelStageCosts()

  $('#funnel_setup_investiment').mask('000.000.000.000.000,00', {reverse: true, maxlength: false})

  $('#edit-investiment-btn, #cancel-investiment-edit').on 'click', window.funnelStageCosts.toggleInvestimentEdit

  $('#investiment-form').on 'ajax:success', (event, data) ->
    $('#investiment-value').html(I18n.toNumber(data.investiment, {precision: 2}))
    window.funnelStageCosts.toggleInvestimentEdit()
    window.funnelStageCosts.calculate_costs()

  $('#period, #compare_with').on 'change', () ->
    window.funnelReport.load()

class FunnelReport
  constructor: ->
    this.load()

  load: ->
    $.when(
      this.load_data(Routes.funnel_load_visitors_path(), $('#total_visitors'), $('#visits_accomplishment')) if $('#total_visitors').size() == 1
      this.load_data(Routes.funnel_load_leads_path(), $('#total_leads'), $('#leads_accomplishment')) if $('#total_leads').size() == 1
      this.load_data(Routes.funnel_load_qualified_leads_path(), $('#total_qualified_leads'), $('#qualified_leads_accomplishment')) if $('#total_qualified_leads').size() == 1
      this.load_data(Routes.funnel_load_opportunities_path(), $('#total_opportunities'), $('#opportunities_accomplishment')) if $('#total_opportunities').size() == 1
      this.load_data(Routes.funnel_load_sales_path(), $('#total_sales'), $('#sales_accomplishment')) if $('#total_sales').size() == 1
    ).then () ->
      funnelStageCosts.calculate_costs()

  load_data: (url, total_selector, accomplishment_selector) ->
    $.get(url, {"period" :  $("#period option:selected").val(), "compare_with" :  $("#compare_with option:selected").val()}).done (data) =>
      total_selector.text(I18n.toNumber(data.total, {precision: 0}))
      this.format_accomplishment(accomplishment_selector, data.accomplishment, data.value_to_compare)

  format_accomplishment: (selector, accomplishment, value_to_compare) ->
    arrow = selector.parent()
    arrow.removeClass("up")
    arrow.removeClass("down")

    if accomplishment >= 0
      signal = "+"
      arrow.addClass('up')
    else
      arrow.addClass('down')

    value = "#{I18n.toNumber(accomplishment, {precision: 1})}%"
    value = "#{signal}#{value}" if signal?
    selector.html("#{value} <span>#{value_to_compare}</span>")


class FunnelStageCosts

  calculate_costs: ->
    this.set_costs($("#lead_cost"), this.retrieve_value("#total_leads"))
    this.set_costs($("#opportunity_cost"), this.retrieve_value("#total_opportunities"))
    this.set_costs($("#sale_cost"), this.retrieve_value("#total_sales"))

  retrieve_value: (selector) ->
    if $(selector).length > 0
      parseInt($(selector).text().replace(".",""))
    else
      0

  set_costs: (selector, total) ->
    investiment = parseFloat $('#investiment-value').text().replace(".","").replace(",", ".")

    if total != 0
      $(selector).html("R$ #{I18n.toNumber((investiment / total), {precision: 2})}")
    else
      $(selector).html("R$ --")

  toggleInvestimentEdit: ->
    $('#edit-investiment-container').toggleClass("hide")
    $('#investiment').toggleClass("hide")


# export to be accessible outside coffee wrappers
(exports ? this).FunnelReport = FunnelReport
(exports ? this).FunnelStageCosts = FunnelStageCosts
