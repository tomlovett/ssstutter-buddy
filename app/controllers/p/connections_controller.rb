# frozen_string_literal: true

class P::ConnectionsController < P::BaseController
  before_action :set_participant, only: %i[index]

  # GET /p/connections
  def index
    render inertia: 'p/Connections/index', props: {
      connections: @participant.connections.as_json(include: :studies),
      participant: @participant.as_json
    }
  end

  private

  def set_participant
    @participant = Current.user.participant
  end
end
