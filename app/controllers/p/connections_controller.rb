# frozen_string_literal: true

class P::ConnectionsController < ApplicationController
  before_action :redirect_if_not_participant
  before_action :set_participant, only: %i[create index]
  before_action :set_connection, only: %i[update]

  # GET /p/connections
  def index
    render inertia 'p/Connections/index', props: {
      connections: @participant.connections.as_json(include: :studies), participant:
    }
  end

  # POST /p/connections
  def create
    return head :unprocessable_entity unless Current.user.participant.id == @participant.id

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

  # PATCH/PUT /p/connections/1
  def update
    if allowed_to?(:update?, @connection) && @connection.update(connection_params)
      head :ok
    else
      head :unprocessable_entity
    end
  end

  private

  def set_participant
    @participant = Current.user.participant
  end

  def set_connection
    @connection = Connection.find(params[:id])
  end

  def connection_params
    params.permit(:study_id, :status)
  end
end
