# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include Response
  include ExceptionHandler

  skip_forgery_protection
  before_action :authenticate_request
  before_action :transform_params

  def props(args = {})
    args[:token] = token if token.present?
    args[:user] = @current_user if @current_user.present?

    args
  end

  def token
    return nil unless current_user

    @token ||= JsonWebToken.encode(user_id: @current_user.id)
  end

  def current_user
    @current_user ||= session[:current_user_id] && User.find_by(id: session[:current_user_id])
  end

  private

  def transform_params
    params.deep_transform_keys!(&:underscore)
  end 

  def authenticate_request
    header = request.headers['Authorization']
    bearer = header.split.last

    @decoded = JsonWebToken.decode(bearer)
    @current_user = User.find(@decoded[:user_id])

    redirect_to confirm_path if @current_user.confirmed_at.blank?
    if @current_user.researcher&.nil? && @current_user.participant&.nil?
      redirect_to select_role_user_path(@current_user)
    end
  rescue StandardError
    redirect_to login_path
  end
end
