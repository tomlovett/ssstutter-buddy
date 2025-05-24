# frozen_string_literal: true

class P::BaseController < ApplicationController
  before_action :redirect_if_not_participant
  before_action :redirect_if_not_complete

  def redirect_if_not_complete
    redirect_to "/p/participants/#{Current.user.participant.id}/edit" unless Current.user.participant.complete?
  end
end
