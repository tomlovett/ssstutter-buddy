# frozen_string_literal: true

class SessionsController < ApplicationController
  allow_unauthenticated_access only: %i[new create]
  rate_limit to: 10, within: 3.minutes, only: :create, with: lambda {
    redirect_to new_session_url, alert: 'Try again later.'
  }

  # skip_before_action :require_authentication

  # GET /login
  def new
    Current.session ||= find_session_by_cookie

    return redirect_to Current.user.home_page if Current.user.present?

    render inertia: 'u/login'
  end

  # POST /login
  def create
    if (user = User.authenticate_by(params.permit(:email, :password)))
      start_new_session_for user
      redirect_to user.home_page
    else
      redirect_to login_path, alert: 'Try another email address or password.'
    end
  end

  # GET /logout
  def destroy
    terminate_session
    redirect_to login_path
  end
end
