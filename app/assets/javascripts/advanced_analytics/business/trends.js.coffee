jQuery ->
  $(".show-cubic input[type='checkbox']").on 'change', ->
    self = $(this)
    if self.is(':checked')
      self.data("report-id", self.data("report-id-checked"))
    else
      self.data("report-id", self.data("report-id-unchecked"))

  $('button.report-change-btn').on 'click', ->
    self = $(this)
    if self.data("report-cubic") == "cubic"
      $('.show-cubic input').prop('disabled', false)
    else
      $('.show-cubic input').prop('disabled', true).prop('checked', false)
