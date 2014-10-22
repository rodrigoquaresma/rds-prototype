LOADING_MESSAGES = ['Carregando', 'Carregando.', 'Carregando..', 'Carregando...']
RETRY_DELAY = 3000

AjaxLoader =
  load: (url, containerSelector, options) ->
    options = AjaxLoader.defaultOptions(options || {})
    container = $(containerSelector)
    AjaxLoader.updateLeading(container, options)
    $.get(url).always (data, status) ->
      json = AjaxLoader.json(data)
      if status == 'success' && json.status
        status = json.status
        data = json.data
      options[status](url, container, data, options)
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

  defaultProcessingHandling: (url, container, data, options) ->
    timer = window.setInterval( ->
      window.clearInterval(timer)
      AjaxLoader.load(url, container, options)
    , options.retryDelay)

  defaultErrorHandling: (url, container, data, options) ->
    container.html('<div class="loading">
                      <p>Ops... ocorreu um problema.</p>
                      <p>
                        <button type="button" class="btn btn-default"> Tentar novamente </button>
                      </p>
                    </div>')
    container.find('button').click ->
      AjaxLoader.load("#{url}&failed=true", container, options)

  defaultOptions: (options) ->
    options.setLoading ||= AjaxLoader.defaultSetLoading
    options.loadingMessages ||= LOADING_MESSAGES
    options.nextLoadingMessageIndex ||= AjaxLoader.cycleMessages
    options.retryDelay ||= RETRY_DELAY
    options.success ||= AjaxLoader.defaultSuccessHandling
    options.processing ||= AjaxLoader.defaultProcessingHandling
    options.error ||= AjaxLoader.defaultErrorHandling
    options

# export to be accessible outside coffee wrappers
(exports ? this).AjaxLoader = AjaxLoader
