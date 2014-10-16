#= require typeahead.rd-custom
#= require company/typeahead-obj

jQuery ->
  helper = new App.CompanyTypeaheadHelper

  changeCompanyTypeahead = $('#merge-company-query').typeahead([
    helper.typeaheadObj('#merge-company-query')
  ])

  $('#merge-company-query').keypress (event) ->
    keycode = if event.keyCode then event.keyCode else event.which
    if(keycode == '13')
      event.preventDefault()
      $('#merge-company-btn').click()
      return false
    
  $('#change_company').on 'show', () ->
    $('#merge-company-btn').attr "disabled", "disabled"

  $('#merge-company-query').bind
    'typeahead:selected': (obj, datum) ->
      helper.fillInfoCard datum
      $('#from_id').val(datum.id)
      $('#merge-company-btn').removeAttr 'disabled'
