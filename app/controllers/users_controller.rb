# frozen_string_literal: true

class UsersController < ApplicationController
  allow_unauthenticated_access only: %i[new create]

  # GET /u/1
  def show
    render inertia: 'u/show', props: { user: Current.user }
  end

  # GET /signup
  def new
    render inertia: 'u/signup', props: { user: User.new }
  end

  # GET /u/1/edit
  def edit
    render inertia: 'u/edit', props: { user: Current.user }
  end

  # GET /u/1/select-role
  def select_role
    if Current.user.participant? || Current.user.researcher?
      redirect_to edit_user_path(Current.user)
    else
      render inertia: 'u/select-role', props: { user: Current.user }
    end
  end

  # POST /u/1/select-role
  def select_role_action
    role = params[:role]

    case role
    when 'participant'
      Current.user.create_participant!
      redirect_to Current.user.home_page
    when 'researcher'
      Current.user.create_researcher!
      redirect_to Current.user.home_page
    else
      head :unprocessable_entity
    end
  end

  # POST /signup
  def create
    @user = User.new(user_params)

    if @user.save
      start_new_session_for(@user)
      redirect_to "/u/#{@user.id}/select-role"
    else
      render inertia: 'u/signup', status: :unprocessable_entity
    end
  end

  # PATCH/PUT /u/1
  def update
    if Current.user.update(user_params)
      head :no_content
    else
      head :unprocessable_entity
    end
  end

  # DELETE /u/1
  def destroy
    Current.user.destroy
    head :no_content
  end

  private

  def user_params
    params.fetch(:user).permit(
      :first_name,
      :last_name,
      :email,
      :password,
      :password_confirmation
    )
  end
end
