jQuery ->
  if $('.pagination').length
    $(window).scroll ->
      url = $('.pagination .next_page').attr('href')
      if url && $(window).scrollTop() > $(document).height() - $(window).height() - 500
        $('.pagination').html("<img src='/assets/loading.gif' />")
        $('.pagination').show();
        $.getScript(url)
        $(window).scroll()

if $("#event_list_pagination").length > 0
  $(".pagination a").each ->
    $(this).attr "data-remote", "true"
    return
