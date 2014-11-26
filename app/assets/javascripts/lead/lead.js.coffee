#= require custom_fields

$ ->
  $('#js-new-custom-field-modal').on 'submit', '#js-new-custom-field-form', (event) ->
    event.preventDefault()
    $.post Routes.add_to_lead_custom_fields_path(), $(this).serialize()

  $('#js-new-custom-field-link').click ->
    $.get Routes.new_custom_field_path(), (data) ->
      $('#js-new-custom-field-modal .modal-content').html data
      $('#js-new-custom-field-modal').modal
        backdrop: 'static'

      CustomFieldHandler.init()