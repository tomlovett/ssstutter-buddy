# frozen_string_literal: true

class Study < ApplicationRecord
  belongs_to :primary_researcher, class_name: 'Researcher'
  has_many :study_participations, dependent: nil

  geocoded_by :address
  after_validation :geocode if Rails.env.production?

  def address
    [city, state, country].compact.join(', ')
  end

  def timeline
    "#{total_hours} over #{total_sessions} over the course of #{duration}"
  end
end
