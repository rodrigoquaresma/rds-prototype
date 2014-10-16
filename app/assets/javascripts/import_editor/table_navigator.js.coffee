class TableNavigator
  constructor: (columns_count,viewport_size,@rainbow_crumbs)->
    @columns_count = parseInt(columns_count)
    @position = 0
    
    # setting up handles so jQuery can grab onto something  
    @handles = {
      leftButton: '#go-left',
      rightButton: '#go-right',
      stepSize: 235,
      visibleSlots: viewport_size,
      closedColor: '#DFF0D8',
      ignoredColor: '#F2DEDE',
      editingColor: '#FEF8E3'
    }
    
    # setting callbacks
    $(@handles.leftButton).click (event) =>
      this.stepLeft()

    $(@handles.rightButton).click (event) =>
      this.stepRight()
      
    # exporting instance to be globally accessible
    window.table_navigator = this
        
  updateColors: ->
    # if there's a rainbow, we should refresh its colors!
    if @rainbow_crumbs?
      colors = []
      for tr in $('#import_table thead tr th[id^=display_column]')
        colors.push $(tr).attr('class')
      for tr,i in $(@rainbow_crumbs.element_id).children()
        $(tr).attr('class',colors[i])

  stepLeft: ->
    @rainbow_crumbs.stepLeft()
    if this.actualStep() > 0
      @position+=@handles.stepSize
      $('#import_table').css('margin-left',"#{@position}px")
  stepRight: ->
    @rainbow_crumbs.stepRight()
    if this.actualStep() < (@columns_count-@handles.visibleSlots)
      @position-=@handles.stepSize
      $('#import_table').css('margin-left',"#{@position}px")
  actualStep: ->
    (@position / @handles.stepSize)*-1

# export to be accessible outside coffee wrappers
(exports ? this).TableNavigator = TableNavigator