# frozen_string_literal: true

class Location < ApplicationRecord
  belongs_to :participant, optional: true
  belongs_to :study, optional: true

  geocoded_by :address, if: ->(obj) { obj.city.present? && Rails.env.production? }
  after_validation :geocode, if: ->(obj) { obj.city.present? && obj.city_changed? && Rails.env.production? }

  scope :has_study, -> { where.not(study_id: nil) }

  def as_json(options = {})
    super.merge(VerifiedAddress.new(self).as_json)
  end

  def address
    [city, state, country].compact.join(', ')
  end

  def complete?
    city.present? && state.present? && country.present?
  end
end
