# frozen_string_literal: true

class Study < ApplicationRecord
  belongs_to :researcher
  has_many :connections, dependent: :nullify
  has_one :location, dependent: :destroy

  accepts_nested_attributes_for :location, reject_if: :all_blank

  scope :draft, -> { where('published_at IS NULL AND closed_at IS NULL') }
  scope :active, -> { where('published_at IS NOT NULL AND closed_at IS NULL AND paused_at IS NULL') }
  scope :paused, -> { where.not(paused_at: nil) }
  scope :published, -> { where.not(published_at: nil) }
  scope :closed, -> { where.not(closed_at: nil) }
  scope :digital_friendly, -> { where(location_type: [HYBRID, DIGITAL]) }

  METHODOLOGIES = [
    'survey',
    'interview',
    'task performance',
    'brain imaging',
    'speech intervention',
    'behavioral intervention',
    'genetic sample collection',
    'pharmaceutical',
    'speaker panel'
  ].freeze

  DIGITAL = 'digital'
  HYBRID = 'hybrid'
  IN_PERSON = 'in_person'

  def as_json(options = {})
    # super.merge(VerifiedAddress.new(self).as_json)
    # locations = self.locations

    if location.nil?
      super.merge(location: nil)
    else
      super.merge(location: location&.as_json)
    end
  end

  def address
    digital_only? ? '' : [city, state, country].compact.join(', ')
  end

  def short_addr
    return 'Online' if location_type == DIGITAL

    location_type == HYBRID ? "Online / #{city}, #{state}" : "#{city}, #{state}, #{country}"
  end

  def status
    return 'paused' if paused?
    return 'draft' unless published?
    return 'closed' if closed?

    'published'
  end

  def timeline
    if total_sessions == 1
      "#{total_hours} #{total_hours == 1 ? 'hour' : 'hours'} in one session"
    else
      "#{total_hours} #{total_hours == 1 ? 'hour' : 'total hours'} in #{total_sessions} sessions \
      over the course of #{duration}"
    end
  end

  def age_range
    return 'All ages' unless min_age? || max_age?

    if min_age?
      max_age? ? "#{min_age}-#{max_age}" : "#{min_age} and up"
    else
      "#{max_age} and under"
    end
  end

  private

  def clear_location
    self.city = nil
    self.state = nil
    self.country = nil
    self.digital_friendly = true
  end
end
