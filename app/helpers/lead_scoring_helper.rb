module LeadScoringHelper

  def active_tab(controller, item)
    controller.split("/").last == item ? 'active': ''
  end

end
