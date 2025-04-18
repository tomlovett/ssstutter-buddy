# frozen_string_literal: true

class R::ParticipantsController < R::BaseController
  before_action :set_participant, only: :show

  # GET /r/participants/1
  def show
    # TODO
    # render inertia: 'r/Participants/show', props: {
    #   participant: @participant
    # }
  end

  private

  def set_participant
    @participant = Participant.find(params[:id])
  end
end
