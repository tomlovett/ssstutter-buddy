# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include Response
  include ExceptionHandler

  skip_forgery_protection
  # before_action :authenticate_request

  def token
    return nil unless current_user

    @token ||= JsonWebToken.encode(user_id: @current_user.id)
  end

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

      redirect_to confirm_path if @current_user.confirmed_at.blank?
      if @current_user.researcher.blank? && @current_user.participant.blank?
        redirect_to select_role_user_path(@current_user)
      end
    rescue StandardError
      redirect_to login_path
    end
  end
end
