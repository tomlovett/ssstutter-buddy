# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include Authentication
  include Gatekeeping

  # Resume session early so Current.user will be passed in inertia_share
  before_action :resume_session_for_inertia

  inertia_share do
    { user: Current.user&.as_json }
  end

  skip_forgery_protection

  def current_user
    Current.user
  end

  private

  def resume_session_for_inertia
    resume_session
  end
end
