# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include Authentication

  skip_forgery_protection

  def current_user
    Current.user
  end
end
