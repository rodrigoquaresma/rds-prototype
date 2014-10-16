class LeadImportColumn
  constructor: (@column_index)->
    @state = 'untouched' # closed/ignored/editing/untouched
    @handles = {
      leadColumnType: "#lead_import_columns_attributes_#{@column_index}_type",
      leadColumnHeader: "#lead_import_columns_attributes_#{@column_index}_column_header",
      displayColumn: "#display_column_#{@column_index}",
      editorColumn: "#editor_column_#{@column_index}",
      okButton: "#ok_column_#{@column_index}",
      editButton: "#edit_column_#{@column_index}",
      ignoreButton: "#ignore_column_#{@column_index}",
      leadColumnSelect: "#column_index_#{@column_index}",
      columnSelector: "#import_table td:nth-child(#{@column_index+1})"
    }

    translated_name = window.lead_import.translateHeaderValueToSelect($(@handles.leadColumnHeader).val())
    $(@handles.leadColumnSelect).val(translated_name)

    if window.lead_import.isMappedKey($(@handles.leadColumnHeader).val())
      this.okAction()

    if $(@handles.leadColumnType).val()=='Lead::ImportColumn::CustomColumn'
      column_type = window.lead_import.translateNameToType(translated_name)
      this.toggleColumnAction(column_type)
      this.editAction()
      #$(@handles.leadColumnType).val(column_type)

    if $(@handles.leadColumnType).val()=='Lead::ImportColumn::IgnoredColumn'
      this.ignoreAction()

    $(@handles.okButton).click =>
      this.okAction()
    $(@handles.editButton).click =>
      this.editAction()
    $(@handles.ignoreButton).click =>
      this.ignoreAction()
    $(@handles.leadColumnSelect).change (event)=>
      column_type = window.lead_import.translateNameToType($(event.target).val())
      this.toggleColumnAction(column_type)

  okAction: ->
    column_index = @column_index
    tha_text = $(@handles.leadColumnSelect).val()
    if tha_text == window.lead_import.handles.customColumnPlaceholder
      tha_text = $(@handles.leadColumnHeader).val()
    else
      tha_text = window.lead_import.translateSelectValueToHeader(tha_text)

    $(@handles.leadColumnHeader).attr('value',tha_text)

    unless window.lead_import.translateHeaderValueToSelect(tha_text)==window.lead_import.handles.customColumnPlaceholder
      tha_text=window.lead_import.translateHeaderValueToSelect(tha_text)

    $(@handles.displayColumn).children().first().text(tha_text)
    $(@handles.editorColumn).hide()
    $(@handles.displayColumn).show()
    $(@handles.displayColumn).removeClass('ignored')
    $(@handles.displayColumn).addClass('closed')
    this.changeState('closed')
    window.lead_import.valid()

  editAction: ->
    $(@handles.editorColumn).show()
    $(@handles.displayColumn).hide()
    this.changeState('editing')
    window.lead_import.valid()

  ignoreAction: ->
    tha_text = $(@handles.leadColumnSelect).val()
    if tha_text == window.lead_import.handles.customColumnPlaceholder
      tha_text = $(@handles.leadColumnHeader).val()

    $(@handles.displayColumn).children().first().text(tha_text)
    $(@handles.editorColumn).hide()
    $(@handles.displayColumn).show()
    $(@handles.displayColumn).removeClass('closed')
    $(@handles.displayColumn).addClass('ignored')
    this.ignoreColumn()
    this.changeState('ignored')
    window.lead_import.valid()

  toggleColumnAction: (column_type) ->
    if column_type == 'Lead::ImportColumn::CustomColumn'
      this.toggleCustomColumn(true)
    else
      $(@handles.leadColumnType).val(column_type)
      this.toggleCustomColumn(false)

  bindESCevent: (index) ->
    $("#column_index_#{index}").keyup (event)->
      if event.keyCode==27
        EditorHandles.toggleCustomColumn(index)

  toggleCustomColumn: (isCustomColumn) ->
    $(@handles.leadColumnHeader).removeAttr('disabled')
    header_value = window.lead_import.translateSelectValueToHeader($(@handles.leadColumnSelect).val())
    # if isCustomColumn==true
    #  $(@handles.leadColumnHeader).removeAttr('disabled')
    #  $(@handles.leadColumnHeader).val('') if window.lead_import.isMappedKey($(@handles.leadColumnHeader).val())
    # else
    #  $(@handles.leadColumnHeader).val(header_value)
    #  $(@handles.leadColumnHeader).attr('disabled','disabled')
    $(@handles.leadColumnType).val(window.lead_import.translateNameToType(header_value)) if header_value!=''

  ignoreColumn: ->
    $(@handles.leadColumnHeader).attr('disabled','disabled')
    $(@handles.leadColumnType).val('Lead::ImportColumn::IgnoredColumn')

  changeState: (new_state) ->
    @state = new_state
    this.updateColumnColoring()

  updateColumnColoring: ->
    $(this.handles.columnSelector).removeClass('open')
    $(this.handles.columnSelector).removeClass('closed')
    $(this.handles.columnSelector).removeClass('ignored')
    switch @state
      when 'closed'
        $(this.handles.columnSelector).addClass('closed')
      when 'ignored'
        $(this.handles.columnSelector).addClass('ignored')
      else
        $(this.handles.columnSelector).addClass('open')

  valid: ->
    if @state=='closed' || @state=='ignored'
      true
    else
      false

# export to be accessible outside coffee wrappers
(exports ? this).LeadImportColumn = LeadImportColumn
