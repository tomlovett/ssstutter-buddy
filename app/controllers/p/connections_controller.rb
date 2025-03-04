# frozen_string_literal: true

class P::ConnectionsController < ApplicationController
  before_action :set_participant, only: %i[create index]

  def index
    render inertia 'p/Connections/index', props: {
      connections: @participant.connections.as_json(include: :studies), participant:
    }
  end

  def create
    @connection = Connection.create(
      participant: @participant,
      study_id: params[:study_id]
    )

    # trigger emails to Researcher and Participant

    if @connection.save!
      head :created
    else
      head :unprocessable_entity
    end
  end

  private

  def set_participant
    # head :unprocessable_entity if @current_user&.participant.nil?

    @participant = Participant.find(1)
    nil

    # @participant = @current_user.participant
  end

  def connection_params
    params.permit(:study_id)
  end
end
