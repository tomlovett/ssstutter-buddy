# frozen_string_literal: true

require 'yaml'

class VerifiedAddress
  # this should be adapted to the Location model
  def initialize(loc_hash)
    @country = {}
    @state = {}
    @city = {}
    @states_list = []
    @cities_list = []
    @location_overrides = location_overrides

    return if loc_hash[:country].blank?

    country_sym = loc_hash[:country].to_sym
    @country = { name: CS.countries[country_sym], symbol: loc_hash[:country] }
    @states_list = CS.states(country_sym).map { |state| { name: state[1], symbol: state[0].to_s } }

    @states_list << @location_overrides[country_sym] if @location_overrides.key?(country_sym)

    return if loc_hash[:state].blank?

    state_sym = loc_hash[:state].to_sym
    @state = { name: CS.states(country_sym)[state_sym], symbol: loc_hash[:state] }
    @cities_list = CS.cities(state_sym).map { |city| { name: city, symbol: city } }

    if @location_overrides.key?(country_sym) && @location_overrides[country_sym].key?(state_sym)
      @cities_list << @location_overrides[country_sym][state_sym]
    end

    return if loc_hash[:city].blank?

    @city = { name: loc_hash[:city], symbol: loc_hash[:city] }
  end

  attr_accessor :country, :state, :city, :states_list, :cities_list

  def as_json
    { country:, state:, city:, states_list:, cities_list: }
  end

  private

  def location_overrides
    @location_overrides ||= YAML.load_file(Rails.root.join('app/lib/location_overrides.yml')).deep_symbolize_keys
  end
end
