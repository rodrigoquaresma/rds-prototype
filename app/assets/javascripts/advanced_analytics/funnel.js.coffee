#= require datepicker/bootstrap-datepicker

jQuery ->

  $('#goals').on 'shown.bs.modal', () ->
    redirectPath = $('a[href="#goals"]').data('redirect-to')
    $.get Routes.edit_funnel_setups_path(), (data) ->
      $('#goals .modal-body').html(data).find("#redirect_to").val(redirectPath)

  $('#save-funnel-setup').live 'click', () ->
    $('#funnel-setup-form').submit()

  $.fn.datepicker.dates['en'] = {
    days: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"],
    daysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
    daysMin: ["Do", "Se", "Te", "Qu", "Qu", "Se", "Sa", "Do"],
    months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    monthsShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    today: "Hoje",
    clear: "Limpar"
  }

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
    })
