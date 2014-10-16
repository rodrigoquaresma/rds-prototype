class LeadImport
  constructor: (columns_count)->
    @columns_count = parseInt(columns_count)
    window.lead_import = this
    @mapped_lead_keys = $('#bind_mapping').val().split(',')
    @columns = []
    @handles = {
      leadColumnName: 'select.column_name',
      customColumnPlaceholder: 'Novo nome de coluna',
      finishImportButton: '#finish_import',
      finish: '#finishFlag'
    }
    for i in [0..@columns_count-1] by 1
      @columns.push new LeadImportColumn(i)

    $('.required_checks').change =>
        this.valid()
    $(@handles.finishImportButton).click ->
      unless $('#finish_import.disabled').length > 0
        $('#finishFlag').removeAttr('disabled')
        $('form').submit()

  isMappedKey: (key) ->
    if @mapped_lead_keys.indexOf(key)!=-1
      true
    else
      false

  translateNameToType: (name) ->
    #load bind_mapper.mapping in here?
    switch name.toLowerCase()
      when 'email', 'email_lead','empresa','cargo','telefone' then 'Lead::ImportColumn::LeadColumn'
      when 'nome' then 'Lead::ImportColumn::FirstNameColumn'
      when 'sobrenome' then 'Lead::ImportColumn::LastNameColumn'
      when 'tag' then 'Lead::ImportColumn::TagColumn'
      when 'evento (identificador)' then 'Lead::ImportColumn::EventColumn'
      else 'Lead::ImportColumn::CustomColumn'

  translateHeaderValueToSelect: (name) ->
    switch name.toLowerCase()
      when 'email_lead' then 'Email'
      when 'nome' then 'Nome'
      when 'empresa' then 'Empresa'
      when 'cargo' then 'Cargo'
      when 'telefone' then 'Telefone'
      when 'tag' then 'Tag'
      when 'evento (identificador)' then 'Evento (identificador)'
      when 'identificador' then 'Evento (identificador)'
      else @handles.customColumnPlaceholder

  translateSelectValueToHeader: (name) ->
    switch name.toLowerCase()
      when 'email' then 'email_lead'
      when 'nome' then 'nome'
      when 'empresa' then 'empresa'
      when 'cargo' then 'cargo'
      when 'telefone' then 'telefone'
      when 'tag' then 'tag'
      when 'evento (identificador)' then 'Evento (identificador)'
      else ''

  valid: ->
    truths = []
    for column in @columns
      truths.push column.valid()
    $('.required_checks').each (index,element)->
      truths.push element.checked

    if $.inArray(false, truths)==-1
      $(@handles.finishImportButton).removeClass('disabled')
      true
    else
      $(@handles.finishImportButton).addClass('disabled')
      false

# export to be accessible outside coffee wrappers
(exports ? this).LeadImport = LeadImport
