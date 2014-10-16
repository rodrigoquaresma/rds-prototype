$ ->
  handleKeyBindings()
  # single keys

  Mousetrap.bind 'shift+d', ->
    window.location.href = Routes.dashboard_path();

  Mousetrap.bind 'shift+p', ->
    window.location.href = Routes.social_media_post_index_path();

  Mousetrap.bind 'shift+k', ->
    window.location.href = Routes.keywords_panel_path();

  Mousetrap.bind 'shift+s', ->
    window.location.href = Routes.on_page_seo_reports_path();

  Mousetrap.bind 'shift+f', ->
    window.location.href = Routes.new_blog_title_path();

  Mousetrap.bind 'shift+l', ->
    window.location.href = Routes.landing_pages_path();

  Mousetrap.bind 'shift+m', ->
    window.location.href = Routes.stream_path();

  Mousetrap.bind 'shift+b', ->
    window.location.href = Routes.leads_path();

  Mousetrap.bind 'shift+x', ->
    window.location.href = Routes.dynamic_list_lists_path();

  Mousetrap.bind 'shift+a', ->
    window.location.href = Routes.lead_nurturing_workflows_path();

  Mousetrap.bind 'shift+e', ->
    window.location.href = Routes.campaigns_path();

  Mousetrap.bind 'shift+t', ->
    window.location.href = Routes.emails_path();

  Mousetrap.bind 'shift+c', ->
    window.location.href = Routes.reach_report_path();

  Mousetrap.bind 'shift+v', ->
    window.location.href = Routes.traffic_sources_report_path();

  Mousetrap.bind 'shift+o', ->
    window.location.href = Routes.traffic_sources_organic_path();

  Mousetrap.bind 'shift+g', ->
    window.location.href = Routes.most_viewed_report_path();

  Mousetrap.bind 'shift+r', ->
    window.location.href = Routes.email_report_path();

$(document).on 'page:change', ->
  handleKeyBindings()

handleKeyBindings = ->
  # As turbolinks does not refresh the page, some old keybindings could be still present. Therefore a reset is required.
  Mousetrap.reset()

  # Hotkey binding to links with 'data-keybinding' attribute
  # Navigate link when hotkey pressed
  $('a[data-keybinding]').each (i, el) ->
    bindedKey = $(el).data('keybinding')
    bindedKey = bindedKey.toString() if typeof(bindedKey) == 'number'
    Mousetrap.bind bindedKey, (e) ->
      if typeof(Turbolinks) == 'undefined'
        # Emulate click if turbolinks defined
        el.click()
      else
        # Use turbolinks to go to URL
        Turbolinks.visit(el.href)

  # Hotkey binding to inputs with 'data-keybinding' attribute
  # Focus input when hotkey pressed
  $('input[data-keybinding]').each (i, el) ->
    Mousetrap.bind $(el).data('keybinding'), (e) ->
      el.focus()
      if e.preventDefault
        e.preventDefault()
      else
        e.returnValue = false

  # Toggle show/hide hotkey hints
  window.mouseTrapRails =
    showOnLoad: false           # Show/hide hotkey hints by default (on page load). Mostly for debugging purposes.
    toggleKeys: 'alt+shift+h'   # Keys combo to toggle hints visibility.
    keysShown: false            # State of hotkey hints
    toggleHints:  ->
      $('a[data-keybinding]').each (i, el) ->
        $el = $(el)
        if mouseTrapRails.keysShown
          $el.removeClass('mt-hotkey-el').find('.mt-hotkey-hint').remove()
        else
          mtKey = $el.data('keybinding')
          $hint = "<i class='mt-hotkey-hint' title='Press \<#{mtKey}\> to open link'>#{mtKey}</i>"
          $el.addClass('mt-hotkey-el') unless $el.css('position') is 'absolute'
          $el.append $hint
      @keysShown ^= true

  Mousetrap.bind mouseTrapRails.toggleKeys, -> mouseTrapRails.toggleHints()

  mouseTrapRails.toggleHints() if mouseTrapRails.showOnLoad
