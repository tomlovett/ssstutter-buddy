# frozen_string_literal: true

class VerifiedAddress
  def initialize(location_hash)
    @country = nil
    @state = nil
    @city = nil

    return if location_hash[:country].nil?

    @country = ISO3166::Country.find_country_by_alpha2(location_hash[:country])

    return if location_hash[:state].nil?

    @state = @country.subdivisions[location_hash[:state]]
    @city = location_hash[:city] || ''
  end

  attr_accessor :country, :state, :city

  def as_json
    {
      country: @country.nil? ? '' : { name: @country.iso_short_name, symbol: @country.alpha2 },
      state: state_to_json,
      city: city_to_json
    }
  end

  private

  def state_to_json
    return '' if @country.nil?

    return { name: @state.name, symbol: @state.code } if @state.present?

    @country.subdivisions.values.pluck(:name, :code).map { |location| { name: location[0], symbol: location[1] } }
  end

  def city_to_json
    return '' if @state.nil?

    return @city if @city.present?

    # https://github.com/thecodecrate/city-state?tab=readme-ov-file#listing-cities
    CS.cities(@state.code.to_sym, @country.alpha2.to_sym)
  end
end
