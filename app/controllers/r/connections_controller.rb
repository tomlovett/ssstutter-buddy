# frozen_string_literal: true

class R::ConnectionsController < R::BaseController
  before_action :set_connection, only: [:update]

  # PUT /r/connections/:id
  def update
    return head :unauthorized unless allowed_to?(:update?, @connection)

    if @connection.update(connection_params)
      head :no_content
    else
      render json: @connection.errors.as_json, status: :unprocessable_entity
    end
  end

  private

  def set_connection
    @connection = Connection.find(params[:id])
  end

  def connection_params
    params.permit(:status)
  end
end
