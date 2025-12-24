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

    session[:return_to_after_authenticating] = params[:return_to] if params[:return_to].present?

    if Current.user.present?
      return redirect_to session[:return_to_after_authenticating] if valid_redirect?

      return redirect_to Current.user.home_page
    end

    render inertia: 'u/login'
  end

  # POST /login
  def create
    provisional_user = User.find_by(email: params[:email], provisional: true)

    if provisional_user.present?
      provisional_user.assign_activation_pin!
      UserMailer.with(user: provisional_user).confirm_provisional_user_email.deliver_later
      return redirect_to '/await-confirmation'
    end

    user = User.authenticate_by(params.permit(:email, :password))

    return head :unauthorized, alert: 'Invalid email or password.' if user.blank?

    start_new_session_for user

    redirect_to valid_redirect? ? session[:return_to_after_authenticating] : user.home_page
  end

  # GET /logout
  def destroy
    terminate_session
    redirect_to login_path
  end

  private

  def valid_redirect?
    session[:return_to_after_authenticating].present? &&
      ['/', '/logout'].exclude?(URI.parse(session[:return_to_after_authenticating]).path)
  end
end
