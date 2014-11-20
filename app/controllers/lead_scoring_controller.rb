class LeadScoringController < ApplicationController

  layout false

  def index
    render layout: "application"
  end

  def show
    render layout: "application"
  end

  def rules
    render layout: "application"
  end

  def rules_fit
    render layout: "lead_scoring/rules"
  end

  def rules_interest
    render layout: "lead_scoring/rules"
  end

  def rules_segmentation
    render layout: "lead_scoring/rules"
  end

  def rules_automation
    render layout: "lead_scoring/rules"
  end

  def stats
    render layout: "application"
  end

  def settings
    render layout: "application"
  end

end
