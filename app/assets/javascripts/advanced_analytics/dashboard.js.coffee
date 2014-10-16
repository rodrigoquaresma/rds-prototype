jQuery ->

  TAB_KEY = 9

  class Helper

    toFloat : (numberStr) ->
      numberStr.replace('.', '').replace(',', '.')

    onlyNumbers : (str) ->
      parseInt(str.replace(/[^\d]/g, ''))

    portion : (x, y) ->
      if x && y && y != 0
        'R$ ' + helper.formatCurrency(x / y)
      else
        '-'

    formatCurrency : (value) ->
      text = (value / 100.0).toFixed(2).replace('.', ',')
      reg = /(\d+)(\d{3})/
      while text.match(reg)
        text = text.replace(reg, '$1.$2')
      text

    getAmmount : (column, cssClass) ->
      helper.onlyNumbers(column.find(cssClass).text())

    getColumn : (elem, offset) ->
      offset ||= 0
      self = $(elem)
      index = self.parents('td').index() + 1 + offset
      self.parents('tbody').find('td:nth-child(' + index + ')')

    applyMask : (elem) ->
      self = $(elem)
      value = helper.onlyNumbers(self.val())
      if value
        self.val(helper.formatCurrency(value))
      else
        self.val('')

    moveFocus : (element, event, selector, startOffset) ->
      if (event.which != TAB_KEY)
        return

      event.preventDefault()
      event.stopPropagation()

      step = if event.shiftKey then 0 else 1
      helper.getColumn(element, startOffset + step).find(selector).focus()

    updatePortion : (elem, name) ->
      self = $(elem)
      column = helper.getColumn(self)
      value = helper.onlyNumbers(self.val())
      sales = helper.getAmmount(column, '.js-sales')
      opportunities = helper.getAmmount(column, '.js-opportunities')
      leads = helper.getAmmount(column, '.js-leads')
      column.find('.js-' + name + '-by-leads').html(helper.portion(value, leads))
      column.find('.js-' + name + '-by-opportunity').html(helper.portion(value, opportunities))
      column.find('.js-' + name + '-by-sale').html(helper.portion(value, sales))

    has_changed : (cost, revenue) ->
      previous.revenue != revenue || previous.cost != cost

    update_save_btn : (enabled) ->
      btn = $('#save_dashboard')
      if(enabled)
        btn.removeAttr('disabled')
        btn.text('Salvar alterações')
      else
        btn.text('Salvo')
        btn.attr('disabled', 'disabled')

  helper = new Helper()

  previous = {}

  $('.js-cost').keydown (event) ->
    helper.moveFocus(this, event, '.js-revenue', -1)

  $('.js-revenue').keydown (event) ->
    helper.moveFocus(this, event, '.js-cost', 0)

  $('.js-cost').keyup (event) ->
    helper.applyMask(this)
    helper.updatePortion(this, 'cost')

  $('.js-revenue').keyup (event) ->
    helper.applyMask(this)
    helper.updatePortion(this, 'revenue')

  $('.js-revenue,.js-cost').focus ->
    self = $(this);
    month = self.data('month')
    previous.revenue = $('.js-revenue[data-month="'+ month + '"]').val()
    previous.cost = $('.js-cost[data-month="'+ month + '"]').val()

  $('.js-revenue,.js-cost').keyup (event) ->
    if (event.which == TAB_KEY)
      return

    self = $(this);
    month = self.data('month')
    revenue = $('.js-revenue[data-month="'+ month + '"]').val()
    cost = $('.js-cost[data-month="'+ month + '"]').val()
    helper.update_save_btn(helper.has_changed(cost, revenue))

  $('.js-revenue,.js-cost').blur ->
    self = $(this);
    month = self.data('month')
    revenue = $('.js-revenue[data-month="'+ month + '"]').val()
    cost = $('.js-cost[data-month="'+ month + '"]').val()

    if (helper.has_changed(cost, revenue))
      $.ajax Routes.save_funnel_report_path(),
        type : "POST"
        data : {
          month_and_year: month,
          cost: helper.toFloat(cost),
          revenue: helper.toFloat(revenue)
        }
        error : (jqXHR, textStatus, errorThrown) ->
          $.bootstrapGrowl("Error ao salvar as informações!", { type: 'danger', width: 600, delay: 1500, allow_dismiss: true })
          helper.update_save_btn(true)
        success : (data, textStatus, jqXHR) ->
          $.bootstrapGrowl("Informações salvas com sucesso!", { type: 'success', width: 600, delay: 1500, allow_dismiss: true })
          helper.update_save_btn(false)

  $('.previous, .next').click ->
    splitedDate = $(this).data('month').split('-')
    month = splitedDate[1];
    year = splitedDate[0];
    window.location = Routes.analytics_business_planning_path() + "/" + year + "/" + month;

  helper.update_save_btn(false)
