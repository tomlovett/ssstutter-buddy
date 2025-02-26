# frozen_string_literal: true

class VerifiedAddress
  def initialize(loc_hash)
    @country = {}
    @state = {}
    @city = {}
    @states_list = []
    @cities_list = []

    return if loc_hash[:country].empty?

    country_sym = loc_hash[:country].to_sym
    @country = { name: CS.countries[country_sym], symbol: loc_hash[:country] }
    @states_list = CS.states(country_sym).map { |s| { name: s[1], symbol: s[0].to_s } }

    return if loc_hash[:state].empty?

    state_symbol = loc_hash[:state].to_sym
    @state = { name: CS.states(country_sym)[state_symbol], symbol: loc_hash[:state] }
    @cities_list = CS.cities(state_symbol).map { |c| { name: c, symbol: c } }

    return if loc_hash[:city].empty?

    @city = { name: loc_hash[:city], symbol: loc_hash[:city] }
  end

  attr_accessor :country, :state, :city, :states_list, :cities_list

  def as_json
    { country:, state:, city:, states_list:, cities_list: }
  end
end
