# frozen_string_literal: true

class UsersController < ApplicationController
  skip_before_action :authenticate_request, only: %i[new create]

  # GET /u/1
  def show
    render inertia: 'u/show', props: { user: @current_user, token: }
  end

  # GET /signup
  def new
    render inertia: 'u/signup', props: { user: User.new }
  end

  # GET /u/1/edit
  def edit
    @current_user = User.first
    render inertia: 'u/edit', props: { user: @current_user, token: }
  end

  # GET /u/1/select-role
  def select_role
    if @current_user.participant || @current_user.researcher
      redirect_to edit_user_path(@current_user)
    else
    render inertia: 'u/select-role', props: { user: @current_user, token: }
    end
  end

  # POST /u/1/select-role
  def select_role_action
    role = params[:role]

    case role
    when 'participant'
      @current_user.create_participant!
      render json: { participant: @current_user.participant, token: }
    when 'researcher'
      @current_user.create_researcher!
      render json: { researcher: @current_user.researcher, token: }
    else
      head :unprocessable_entity
    end
  end

  # POST /signup
  def create
    @current_user = User.new(user_params)

    if @current_user.save
      JsonWebToken.encode(user_id: @current_user.id)
      redirect_to select_role_user_path(@current_user)
    else
      render inertia: 'u/signup', status: :unprocessable_entity
    end
  end

  # PATCH/PUT /u/1
  def update
    if @current_user.update(user_params)
      head :no_content
    else
      head :unprocessable_entity
    end
  end

  # DELETE /u/1
  def destroy
    @current_user.destroy
    head :no_content
  end

  private

  def user_params
    params.fetch(:user).permit(
      :first_name,
      :last_name,
      :email,
      :password,
      :password_digest,
      :password_confirmation
    )
  end
end
