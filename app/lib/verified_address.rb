# frozen_string_literal: true

class VerifiedAddress
  def initialize(location_hash)
    @country = nil
    @state = nil
    @city = nil
    @states_list = []
    @cities_list = []

    return if location_hash[:country].nil?

    @country = ISO3166::Country.find_country_by_alpha2(location_hash[:country])
    @states_list = @country.subdivisions.values
                           .pluck(:name, :code).map do |pluck_values|
      { name: pluck_values[0],
        symbol: pluck_values[1] }
    end

    return if location_hash[:state].nil?

    @state = @country.subdivisions[location_hash[:state]]
    @cities_list = gen_cities_list

    @city = location_hash[:city]
  end

  attr_accessor :country, :state, :city, :states_list, :cities_list

  def as_json
    {
      country: @country.nil? ? {} : { name: @country.iso_short_name, symbol: @country.alpha2 },
      state: @state.nil? ? {} : { name: @state.name, symbol: @state.code },
      city: @city.nil? ? {} : { name: @city, symbol: @city },
      states_list:,
      cities_list:
    }
  end

  private

  def gen_states_list
    return [] if @country.nil?

    @country.subdivisions.values
            .pluck(:name, :code).map { |pluck_values| { name: pluck_values[0], symbol: pluck_values[1] } }
  end

  def gen_cities_list
    return [] if @state.nil?

    # https://github.com/thecodecrate/city-state?tab=readme-ov-file#listing-cities
    CS.cities(@state.code.to_sym, @country.alpha2.to_sym).map { |city| { name: city, symbol: city } }
  end
end
