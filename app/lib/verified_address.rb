# frozen_string_literal: true

LOCATION_OVERRIDES = {
  AS: {
    E: ['American Samoa'],
    M: ['American Samoa'],
    R: ['American Samoa'],
    S: ['American Samoa'],
    W: ['American Samoa']
  },
  US: {
    CT: ['Middletown']
  }
}.freeze

class VerifiedAddress
  def initialize(loc_hash)
    @country = {}
    @state = {}
    @city = {}
    @states_list = []
    @cities_list = []

    return if loc_hash[:country].nil?

    country_sym = loc_hash[:country].to_sym
    @country = { name: CS.countries[country_sym], symbol: loc_hash[:country] }
    @states_list = CS.states(country_sym).map { |s| { name: s[1], symbol: s[0].to_s } }

    @states_list << LOCATION_OVERRIDES[country_sym] if LOCATION_OVERRIDES.key?(country_sym)

    return if loc_hash[:state].nil?

    state_sym = loc_hash[:state].to_sym
    @state = { name: CS.states(country_sym)[state_sym], symbol: loc_hash[:state] }
    @cities_list = CS.cities(state_sym).map { |c| { name: c, symbol: c } }

    if LOCATION_OVERRIDES.key?(country_sym) && LOCATION_OVERRIDES[country_sym].key?(state_sym)
      @cities_list << LOCATION_OVERRIDES[country_sym]
    end

    return if loc_hash[:city].nil?

    @city = { name: loc_hash[:city], symbol: loc_hash[:city] }
  end

  attr_accessor :country, :state, :city, :states_list, :cities_list

  def as_json
    { country:, state:, city:, states_list:, cities_list: }
  end
end
