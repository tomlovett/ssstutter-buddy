# frozen_string_literal: true

class P::ConnectionsController < P::BaseController
  before_action :set_participant, only: %i[create index]
  before_action :set_connection, only: %i[update]

  # GET /p/connections
  def index
    render inertia: 'p/Connections/index', props: {
      connections: @participant.connections.as_json(include: :studies),
      participant: @participant.as_json
    }
  end

  # POST /p/connections
  def create
    return head :unprocessable_entity unless Current.user.participant.id == @participant.id

    @connection = Connection.create(
      participant: @participant,
      study_id: connection_params[:study_id],
      invitation_status: connection_params[:invitation_status]
    )

    if [Connection::ACCEPTED, Connection::INTERESTED].include?(connection_params[:invitation_status])
      @connection.study_status = Connection::CONNECTED
      ConnectionMailer.with(connection: @connection).new_connection.deliver_later
    end

    if @connection.save
      redirect_to '/p/connections', status: :see_other
    else
      head :unprocessable_entity
    end
  end

  # PATCH/PUT /p/connections/1
  def update
    # Ensure the connection belongs to the current participant
    return head :unauthorized unless @connection.participant_id == Current.user.participant.id

    if @connection.invitation_status == Connection::INVITED && connection_params[:invitation_status] == Connection::ACCEPTED
      ConnectionMailer.with(connection: @connection).new_connection.deliver_later
    end

    if @connection.update(connection_params)
      redirect_to '/p/connections', status: :see_other
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
    # Handle both nested and flat parameter structures
    if params[:connection]
      params.require(:connection).permit(:study_id, :study_status, :invitation_status)
    else
      params.permit(:study_id, :study_status, :invitation_status)
    end
  end
end
