#= require typeahead.rd-custom
#= require company/typeahead-obj
jQuery ->
  helper = new App.CompanyTypeaheadHelper

  changeCompanyTypeahead = $('#change-company-query').typeahead([
    helper.typeaheadObj('#change-company-query')
  ])

  $('#change-company-query').bind
    'typeahead:selected': (obj, datum) ->
      helper.fillInfoCard datum

  $('#change_company_button').click (event) ->
    event.preventDefault()
    event.stopPropagation()
    req = $.post Routes.change_company_path(),
      lead_id: $('#change_company').data('lead-id')
      company_id: $("#change_company").data("company_id")
    req.fail (data) ->
      alert("Não foi possível concluir esta operação. Por favor verifique os dados e tente novamente.")
    return false
