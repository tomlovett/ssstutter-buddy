# frozen_string_literal: true

module Authentication
  extend ActiveSupport::Concern

  included do
    before_action :require_authentication
    helper_method :authenticated?
  end

  class_methods do
    def allow_unauthenticated_access(**options)
      skip_before_action :require_authentication, **options
    end
  end

  private

  def authenticated?
    resume_session
  end

  def require_authentication
    resume_session || request_authentication
  end

  def resume_session
    Current.session ||= find_session_by_cookie
  end

  def find_session_by_cookie
    session = Session.find_by(id: cookies.signed[:session_id])

    return nil if session&.expired? && session.destroy

    session
  end

  def request_authentication
    session[:return_to_after_authenticating] = request.url
    redirect_to login_url
  end

  def after_authentication_url
    session.delete(:return_to_after_authenticating) || root_url
  end

  def start_new_session_for(user)
    if user.sessions.active.count >= 5
      oldest_session = user.sessions.active.order(:created_at).first
      oldest_session&.destroy
    end

    user.sessions.create!(user_agent: request.user_agent, ip_address: request.remote_ip).tap do |session|
      Current.session = session
      cookies.signed[:session_id] = {
        value: session.id,
        httponly: true,
        same_site: :lax,
        expires: 30.days.from_now
      }
    end
  end

  def terminate_session
    Current.session&.destroy
    cookies.delete(:session_id)
  end
end
