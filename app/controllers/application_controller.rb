# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include Authentication
  include Gatekeeping

  inertia_share do
    { user: Current.user.as_json } if Current.user.present?
  end

  skip_forgery_protection
end
