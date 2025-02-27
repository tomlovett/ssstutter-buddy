# frozen_string_literal: true

class R::ParticipantsController < ApplicationController
  before_action :set_participant, only: :show

  # GET /r/participants/1
  def show; end

  private

  def set_participant
    @participant = Participant.find(params[:id])
  end
end
