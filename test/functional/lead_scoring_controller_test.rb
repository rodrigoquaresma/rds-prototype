require 'test_helper'

class LeadScoringControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
  end

  test "should get show" do
    get :show
    assert_response :success
  end

  test "should get steps" do
    get :steps
    assert_response :success
  end

  test "should get stats" do
    get :stats
    assert_response :success
  end

  test "should get settings" do
    get :settings
    assert_response :success
  end

end
