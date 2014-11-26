#= require datepicker/bootstrap-datepicker
#= require bootstrap-datepicker.pt-BR

jQuery ->

  $('#goals').on 'shown.bs.modal', () ->
    redirectPath = $('a[href="#goals"]').data('redirect-to')
    $.get Routes.edit_funnel_setups_path(), (data) ->
      $('#goals .modal-body').html(data).find("#redirect_to").val(redirectPath)

  $('#save-funnel-setup').live 'click', () ->
    $('#funnel-setup-form').submit()

  date = new Date()
  $('.funnel-date-picker').each ->
    start = $(this).data('start-date')
    $(this).datepicker({
      format: "m/yyyy",
      weekStart: 0,
      startDate: start,
      endDate: (date.getMonth() + 1) + "/" + date.getFullYear(),
      startView: 1,
      minViewMode: 1,
      language: "pt-BR",
      todayHighlight: true,
      autoclose: true
    }).on 'keydown', (e) ->
      # prevent manual input
      e.preventDefault()
