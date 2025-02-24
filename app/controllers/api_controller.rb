# frozen_string_literal: true

class ApiController < ApplicationController
  protect_from_forgery with: :null_session

  # POST /api/location
  def location
    verified_address = VerifiedAddress.new(location_params).as_json

    render json: verified_address, status: :ok
  end

  private

  def location_params
    params.permit(:country, :state, :city)
  end
end
