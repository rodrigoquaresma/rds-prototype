#= require ajax_loader
#= require jquery.mask.min

jQuery ->

  TAB_KEY = 9

  class Helper

    toFloat : (numberStr) ->
      numberStr.replace(/\./g, '').replace(/\,/, '.')

    has_changed : (value) ->
      previous != value

    update_save_btn : (enabled) ->
      btn = $('#save_dashboard')
      if(enabled)
        btn.removeAttr('disabled').text('Salvar alterações')
      else
        btn.text('Salvo').attr('disabled', 'disabled')

    msg_fail: () ->
      $.bootstrapGrowl("Error ao salvar as informações!", { type: 'danger', width: 600, delay: 1500, allow_dismiss: true, offset: {from: 'bottom', amount: 105} })
      update_save_btn(true)

    msg_success: () ->
       $.bootstrapGrowl("Informações salvas com sucesso!", { type: 'success', width: 600, delay: 1500, allow_dismiss: true, offset: {from: 'bottom', amount: 105} })

  helper = new Helper()

  previous = -1

  $(document).ajaxSuccess ->
    $(".js-edit-value, .js-previous-edit-planning, .js-next-edit-planning, .js-metric-visible").unbind()

    $(".js-input-money").mask('000.000.000.000.000,00', {reverse: true, pattern: /[0-9]/})
    $(".js-input-number").mask("###.###.###.###.###", {reverse: true, maxlength: false, pattern: /[0-9]/})

    $.each $(".js-input-money"), (_, input) ->
      value = $(input).val()
      if value[0] == '.'
        $(input).val(value.substring(1))

    $('.js-previous, .js-next').click ->
      splitedDate = $(this).data('month').split('-')
      month = splitedDate[1]
      year = splitedDate[0]
      $.get Routes.analytics_business_planning_path({year,month})

    $('.js-edit-value').keyup (event) ->
      if (event.which == TAB_KEY)
        return
      helper.update_save_btn(!helper.has_changed($(this).val()))

    $('.js-edit-value').focus ->
      self = $(this)
      previous = $(this).val()

    $('.js-metric-visible').change ->
      parent = $(this).parents('.panel')
      metric_id = parent.data('metric-id')
      metric_visible = !(parent.find('.js-metric-visible').prop( "checked" ))

      $.ajax Routes.analytics_business_planning_metric_visible_path(),
        type : "POST"
        data : {
          metric_id: metric_id,
          metric_visible: metric_visible
        }
        error : () ->
          helper.msg_fail()
          helper.update_save_btn(true)
        success : (data) ->
          helper.msg_success()

    $('.js-edit-value').blur ->
      self = $(this)
      return unless helper.has_changed(self.val())

      parent = self.parents('.panel')
      metric_date = self.data('month')
      metric_id = parent.data('metric-id')

      actual = parent.find(".js-actual[data-month='#{ metric_date }']").val()
      if $(parent.find(".js-input-money.js-actual[data-month='#{ metric_date }']"))
        actual = helper.toFloat(actual)

      goal = parent.find(".js-goal[data-month='#{ metric_date }']").val()
      if $(parent.find(".js-input-money.js-goal[data-month='#{ metric_date }']"))
        goal = helper.toFloat(goal)

      $.ajax Routes.analytics_business_save_funnel_report_path(),
        type : "POST"
        data : {
          metric_date: metric_date,
          metric_id: metric_id,
          actual: actual,
          goal: goal
        }
        error : () ->
          helper.msg_fail()
        success : (data, textStatus, jqXHR) ->
          helper.msg_success()

      helper.update_save_btn(false)

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
