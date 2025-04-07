# frozen_string_literal: true

class ApiController < ApplicationController
  skip_before_action :authenticate_request

  # POST /api/location
  def location
    verified_address = VerifiedAddress.new(location_params).as_json

    render json: verified_address, status: :ok
  end

  private

  def location_params
    params.require(:api).permit(:country, :state, :city)
  end
end
