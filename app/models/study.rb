# frozen_string_literal: true

class Study < ApplicationRecord
  belongs_to :researcher
  has_many :connections, dependent: :nullify
  has_many :locations, dependent: :destroy

  validates :city, presence: true, unless: -> { :digital_only }

  after_validation :geocode, if: ->(obj) { obj.city.present? && obj.city_changed? }
  before_save :clear_location, if: :digital_only?

  geocoded_by :address, unless: :digital_only

  scope :draft, -> { where('published_at IS NULL AND closed_at IS NULL') }
  scope :active, -> { where('published_at IS NOT NULL AND closed_at IS NULL AND paused_at IS NULL') }
  scope :paused, -> { where.not(paused_at: nil) }
  scope :published, -> { where.not(published_at: nil) }
  scope :closed, -> { where.not(closed_at: nil) }
  scope :digital_friendly, -> { where(digital_friendly: true) }

  METHODOLOGIES = [
    'survey',
    'interview',
    'task performance',
    'brain imaging',
    'speech intervention',
    'behavioral intervention',
    'genetic sample collection',
    'pharmaceutical'
  ].freeze

  def as_json(options = {})
    super.merge(VerifiedAddress.new(self).as_json)
    # super.merge(locations: locations.map(&:as_json))
  end

  def address
    digital_only? ? '' : [city, state, country].compact.join(', ')
  end

  def short_addr
    return 'Online' if digital_only?

    digital_friendly? ? "Online / #{city}, #{state}" : "#{city}, #{state}, #{country}"
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

  def duration_number
    duration.nil? ? '' : duration.split[0]
  end

  def duration_factor
    duration.nil? ? '' : duration.split[1]
  end

  private

  def clear_location
    self.city = nil
    self.state = nil
    self.country = nil
    self.digital_friendly = true
  end
end
