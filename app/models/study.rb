# frozen_string_literal: true

class Study < ApplicationRecord
  belongs_to :researcher
  has_many :connections, dependent: nil

  validates :city, presence: true, unless: -> { :digital_only }

  after_validation :geocode, if: ->(obj) { obj.city.present? && obj.city_changed? }
  before_save :clear_location, if: :digital_only?

  geocoded_by :address, unless: :digital_only

  scope :closed, -> { where('close_date > ?', Time.zone.today) }
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
  end

  def address
    [city, state, country].compact.join(', ')
  end

  def short_addr
    digital_only? ? 'Online' : "#{city}, #{state}"
  end

  def display_remuneration
    remuneration.zero? ? 'Gratis' : "#{remuneration}$"
  end

  def timeline
    if total_sessions == 1
      "#{total_hours} #{total_hours == 1 ? 'hour' : 'hours'} in one session"
    else
      "#{total_hours} #{total_hours == 1 ? 'hour' : 'total hours'} in #{total_sessions} sessions \
      over the course of #{duration}"
    end
  end

  def open?
    Time.zone.today.between?(start_date, end_date)
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
