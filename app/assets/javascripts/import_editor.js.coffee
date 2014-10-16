#= require import_editor/rainbow_crumbs
#= require import_editor/table_navigator
#= require import_editor/lead_import
#= require import_editor/lead_import_column
#= require datepicker/bootstrap-datepicker

jQuery ->
  columns_count = $('#number_of_columns').val()
  viewport_size = 4
  rainbow_crumbs = new RainbowCrumbs('#rainbow_crumbs',columns_count,viewport_size);
  new TableNavigator(columns_count,viewport_size,rainbow_crumbs)
  new LeadImport(columns_count)

$.station.init.add ->
  toggleFieldTrigger = undefined
  toggleSelectedField = undefined
  toggleFieldTrigger = $("[data-form-toggle]")
  toggleSelectedField = ->
    fieldSelector = undefined
    selectedFieldValue = undefined
    selectedFieldValue = $(this).data("form-toggle")
    fieldSelector = $(selectedFieldValue)
    fieldSelector.slideToggle 300
    return

  toggleFieldTrigger.on "change", toggleSelectedField

  return

$(document).ready ->
  $(".date-picker").datepicker
    format: "dd/mm/yyyy"
    language: "pt-BR"
  return
