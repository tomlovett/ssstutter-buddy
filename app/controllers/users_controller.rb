# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :set_user, only: %i[show edit change_password update destroy]

  # GET /users/1
  def show; end

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit; end

  # GET /users/1/change_password
  def change_password; end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      confirmation_link = @user.confirmation_link # not built yet
      UserMailer.with(user: @user, @confirmation_link: confirmation_link).confirmation_email
      render :select_role
    else
      render :new, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      redirect_to @user, notice: t.success, status: :see_other
    else
      render :edit, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
    redirect_to users_url, notice: t.success, status: :see_other
  end

  def confirm_email
    if params[:pin] == @user.confirmation_pin
      @user.update(confirmed: DateTime.now)

      # render: thank you for confirming!
    else
      # render: bad link, request another
      # this was not a valid link. to request a new link for your account, enter your email below
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.fetch(:user).permit(:first_name, :last_name, :email, :password, :password_digest, :password_confirmation)
  end

  def confirm_params
    params.fetch(:pin, :user)
  end
end
