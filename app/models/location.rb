# frozen_string_literal: true

class Location < ApplicationRecord
  belongs_to :participant, optional: true
  belongs_to :study, optional: true

  geocoded_by :address, if: ->(obj) { obj.city.present? && Rails.env.production? }
  after_validation :geocode, if: ->(obj) { obj.city.present? && obj.city_changed? && Rails.env.production? }

  def address
    if city.present?
      [city, state, country].compact.join(', ')
    elsif state.present?
      # use long-version of state
      [CS.states(country.to_sym)[state.to_sym], country].compact.join(', ')
    else
      # use long-version of country
      CS.countries[country.to_sym]
    end
  end
end
