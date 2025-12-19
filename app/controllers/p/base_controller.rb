# frozen_string_literal: true

class P::BaseController < ApplicationController
  allow_unauthenticated_access

  before_action :gatekeep_all_researchers
  before_action :require_registered_participant, unless: :public_route?
  before_action :redirect_if_not_complete

  PUBLIC_PATHS = [
    '/p/digital-studies',
    %r{^/p/studies/\d+$}, # study show /p/studies/1
    %r{^/p/researchers/\d+$}, # researcher show /p/researchers/1
    '/p/invitations' # invitation create /p/invitations
  ].freeze

  private

  def gatekeep_all_researchers
    redirect_to Current.user.home_page if Current.user&.researcher?
  end

  def require_registered_participant
    return if Current.user&.participant?

    session[:return_to_after_authenticating] = request.url
    redirect_to Current.user.nil? ? '/p/digital-studies' : Current.user.home_page
  end

  def redirect_if_not_complete
    return if Current.user.nil?

    redirect_to "/p/participants/#{Current.user.participant.id}/edit" unless Current.user&.participant&.complete?
  end

  def public_route?
    PUBLIC_PATHS.any? { |pattern| pattern.match?(request.path) }
  end
end
