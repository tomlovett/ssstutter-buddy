# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include Response
  include ExceptionHandler

  skip_forgery_protection

  # before_action :authenticate_request

  private

  def current_user
    @current_user ||= session[:current_user_id] && User.find_by(id: session[:current_user_id])
  end

  def authenticate_request
    header = request.headers['Authorization']
    bearer = header.split.last if header

    begin
      @decoded = JsonWebToken.decode(bearer)
      @current_user = User.find(@decoded[:user_id])
    rescue StandardError => e
      render json: { errors: e.message }, status: :unauthorized
    end
  end
end
