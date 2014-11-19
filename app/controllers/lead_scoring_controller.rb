class LeadScoringController < ApplicationController

  def index
  end

  def show
  end

  def steps
    render 'steps/index'
  end

  def step_fit
    render 'lead_scoring/steps/fit'
  end

  def step_interest
    render 'lead_scoring/steps/interest'
  end

  def step_segmentation
    render 'lead_scoring/steps/segmentation'
  end

  def step_automation
    render 'lead_scoring/steps/automation'
  end

  def stats
  end

  def settings
  end

end
