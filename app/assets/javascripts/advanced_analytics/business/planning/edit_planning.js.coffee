#= require ajax_loader

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

    has_changed : (attr, value) ->
      previous[attr] != value

    update_save_btn : (enabled) ->
      btn = $('#save_dashboard')
      if(enabled)
        btn.removeAttr('disabled').text('Salvar alterações')
      else
        btn.text('Salvo').attr('disabled', 'disabled')

  helper = new Helper()

  previous = {}

  input_selected_value = (month, attr) ->
    $('.js-edit-value[data-month="'+ month + '"][data-attr="'+ attr + '"]').val()

  $(document).ajaxSuccess ->
    $(".js-edit-value, .js-previous-edit-planning, .js-next-edit-planning").unbind()

    $.each $(".js-edit-value"), (_, input) ->
      helper.applyMask(input)

    $('.js-previous, .js-next').click ->
      splitedDate = $(this).data('month').split('-')
      month = splitedDate[1]
      year = splitedDate[0]
      $.get Routes.analytics_business_planning_path({year,month})

    $('.js-edit-value').keyup (event) ->
      if (event.which == TAB_KEY)
        return
      helper.applyMask(this)
      attr = $(this).data('attr')
      month = $(this).data('month')
      value = input_selected_value(month, attr)
      helper.update_save_btn(!helper.has_changed(value))

    $('.js-edit-value').focus ->
      self = $(this)
      attr = self.data('attr')
      month = self.data('month')
      previous[attr] = input_selected_value(month, attr)

    $('.js-edit-value').blur ->
      self = $(this)
      month = self.data('month')
      attr = self.data('attr')
      value = input_selected_value(month, attr)

      if (helper.has_changed(attr, value))
        $.ajax Routes.analytics_business_save_funnel_report_path(),
          type : "POST"
          data : {
            month_and_year: month,
            attribute: attr,
            value: helper.toFloat(value)
          }
          error : (jqXHR, textStatus, errorThrown) ->
            $.bootstrapGrowl("Error ao salvar as informações!", { type: 'danger', width: 600, delay: 1500, allow_dismiss: true, offset: {from: 'bottom', amount: 105} })
            helper.update_save_btn(true)
          success : (data, textStatus, jqXHR) ->
            $.bootstrapGrowl("Informações salvas com sucesso!", { type: 'success', width: 600, delay: 1500, allow_dismiss: true, offset: {from: 'bottom', amount: 105} })

      helper.update_save_btn(false)

    $(document).on 'ajaxComplete', () ->
      $(".js-previous-edit-planning, .js-next-edit-planning").unbind()
      
      $('.js-previous-edit-planning, .js-next-edit-planning').click ->
        splitedDate = $(this).data('month').split('-')
        panel = $(this).data('panel')
        month = splitedDate[1]
        year = splitedDate[0]
        $.get Routes.analytics_business_planning_edit_path({year,month,panel})

      $(".js-edit-planning").on 'click', () ->
        $.ajax
          url: Routes.analytics_business_planning_edit_path()
          success: () ->
            $('.js-actions-footer-planning').removeClass('hide')
          error: () ->
            $('.js-planning-show').html('<div class="loading"><p>Ops... ocorreu um problema.</p> <p><a class="btn btn-default" href="'+Routes.analytics_business_planning_edit_path()+'"> Tentar novamente</a></p></div>')
