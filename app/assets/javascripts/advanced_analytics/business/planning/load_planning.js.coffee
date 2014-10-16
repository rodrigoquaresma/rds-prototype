jQuery ->
  $(document).on 'ready', () ->
    $.ajax
     url: Routes.analytics_business_planning_path()
     error: () ->
      $('.dash-planning').html('<div class="loading"><p>Ops... ocorreu um problema.</p> <p><a class="btn btn-default" href="'+Routes.analytics_business_planning_path()+'"> Tentar novamente</a></p></div>')
