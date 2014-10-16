AjaxLoader =
  load: (url, containerSelector) ->
    container = $(containerSelector)
    container.html('<div class="loading">Carregando...</div>')
    container.load(url, (data, status) ->
      AjaxLoader.handleError(url, container) if status == 'error'
    )

  handleError: (url, container) ->
    container.html('<div class="loading">
                      <p>Ops... ocorreu um problema.</p>
                      <p>
                        <button type="button" class="btn btn-default"> Tentar novamente </button>
                      </p>
                    </div>')
    container.find('button').click ->
      AjaxLoader.load(url, container)

# export to be accessible outside coffee wrappers
(exports ? this).AjaxLoader = AjaxLoader
