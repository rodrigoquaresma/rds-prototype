class RainbowCrumbs
  constructor: (@element_id,rainbow_size,viewport_size) ->
    @position = 0
    @config = {
      rainbow_size: rainbow_size,
      viewport_size: viewport_size,
      viewport: this.buildViewportArray(),
      stateColors: ['#FFF','#F7F7F7']
    }
    window.rainbow_crumbs = this
    
  buildViewportArray: (viewport_size)->
    [1,1,1,1]

  stepRight: ->
    @position+=1 unless @position==(@config.rainbow_size-@config.viewport_size)
    this.updateRainbow()

  stepLeft: ->
    @position-=1 unless @position==0
    this.updateRainbow()

  prependArray: ->
    prepend = []
    i=0
    while i<@position
      prepend.push(0)
      i++
    return prepend

  appendArray: ->
    append = []
    append_rule = @config.rainbow_size-@position-@config.viewport_size
    i=0
    while i<append_rule
      append.push(0)
      i++
    return append

  viewport: ->
    viewport = @config.viewport.slice(0) # clone!
    viewport = viewport.concat(this.appendArray())
    viewport = this.prependArray().concat(viewport)
    return viewport

  rainbowCrumbs: ->
    content = ""
    for state in this.viewport()
      content += "<td style=\"background-color: #{@config.stateColors[state]}\"></td>\n"
    return content

  updateRainbow: ->
    $(@element_id).html(this.rainbowCrumbs())
    

# export to be accessible outside coffee wrappers
(exports ? this).RainbowCrumbs = RainbowCrumbs