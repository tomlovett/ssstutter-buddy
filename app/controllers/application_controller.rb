# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include Response
  include ExceptionHandler

  private

  def current_user
    @current_user ||= session[:current_user_id] && User.find_by(id: session[:current_user_id])
  end
end
