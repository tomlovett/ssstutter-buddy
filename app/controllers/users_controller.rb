# frozen_string_literal: true

class UsersController < ApplicationController
  def index
    @users = User.all

    json_response(@users)
  end

  def show
    json_response(@current_user)
  end

  def create
    @current_user = User.create!(user_params)

    json_response(@current_user, status: :created, location: @current_user)
  end

  def update
    @current_user.update(user_params)

    json_response(@current_user)
  end

  def destroy
    @current_user.destroy
  end

  private

  def user_params
    params.fetch(:user, {})
  end
end
