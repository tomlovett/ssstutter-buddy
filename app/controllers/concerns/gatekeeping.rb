# frozen_string_literal: true

module Gatekeeping
  extend ActiveSupport::Concern

  def redirect_if_not_researcher
    return redirect_to login_url if Current.user.nil?

    redirect_to Current.user.home_page unless Current.user.researcher?
  end

  def redirect_if_not_participant
    return redirect_to login_url if Current.user.nil?

    redirect_to Current.user.home_page unless Current.user.participant?
  end
end
