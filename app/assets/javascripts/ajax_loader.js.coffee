LOADING_MESSAGES = ['Carregando', 'Carregando.', 'Carregando..', 'Carregando...']
RETRY_DELAY = 3000
TIMERS = {}

AjaxLoader =
  load: (url, containerSelector, options) ->
    options = AjaxLoader.defaultOptions(options || {})
    window.clearInterval(TIMERS[options.getRequestGroupId(url)])
    container = $(containerSelector)
    AjaxLoader.updateLeading(container, options)
    $.get(url).always (data, status) ->
      json = AjaxLoader.json(data)
      if status == 'success' && json.status
        status = json.status
        data = json.data
      options[status](url.replace(/&failed=true$/, ''), container, data, options)
    options

  json: (data) ->
    return data if typeof data == 'object'
    try
      JSON.parse(data)
    catch error
      {}

  updateLeading: (container, options) ->
    content = container.text()
    index = options.nextLoadingMessageIndex(options.loadingMessages.indexOf(content), options.loadingMessages.length)
    options.setLoading(container, options.loadingMessages[index])

  cycleMessages: (index, length) ->
    (index + 1) % length

  stopInLastMessage: (index, length) ->
    Math.min(index + 1, length - 1)

  defaultSetLoading: (container, message) ->
    container.html('<div class="loading">' + message + '</div>')

  defaultSuccessHandling: (url, container, data, options) ->
    container.html(data)

  defaultNocontentHandling: (url, container, data, options) ->
    container.html(data)

  defaultProcessingHandling: (url, container, data, options) ->
    requestGroup = options.getRequestGroupId(url)
    timer = window.setInterval( ->
      window.clearInterval(timer)
      delete TIMERS[requestGroup] if TIMERS[requestGroup] == timer
      AjaxLoader.load(url, container, options)
    , options.retryDelay)
    TIMERS[requestGroup] = timer

  defaultErrorHandling: (url, container, data, options) ->
    container.html('<div class="loading">
                      <p>Ops... ocorreu um problema.</p>
                      <p>
                        <button type="button" class="btn btn-default"> Tentar novamente </button>
                      </p>
                    </div>')
    container.find('button').click ->
      AjaxLoader.load("#{url}&failed=true", container, options)

  defaultGetRequestGroupId: (url) ->
    url.replace(/[?#&].*/, '')

  defaultOptions: (options) ->
    options.setLoading ||= AjaxLoader.defaultSetLoading
    options.loadingMessages ||= LOADING_MESSAGES
    options.nextLoadingMessageIndex ||= AjaxLoader.cycleMessages
    options.retryDelay ||= RETRY_DELAY
    options.success ||= AjaxLoader.defaultSuccessHandling
    options.processing ||= AjaxLoader.defaultProcessingHandling
    options.nocontent ||= AjaxLoader.defaultNocontentHandling
    options.error ||= AjaxLoader.defaultErrorHandling
    options.getRequestGroupId ||= AjaxLoader.defaultGetRequestGroupId
    options

# export to be accessible outside coffee wrappers
(exports ? this).AjaxLoader = AjaxLoader
