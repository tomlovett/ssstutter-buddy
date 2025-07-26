# frozen_string_literal: true

class Connection < ApplicationRecord
  belongs_to :participant
  belongs_to :study
  has_one :researcher, through: :study

  # Study statuses
  CONNECTED = 'connected'
  STUDY_BEGAN = 'study began'
  STUDY_COMPLETED = 'study completed'
  ON_HOLD = 'on hold'
  DROPPED_OUT = 'dropped out'
  FOLLOWUP_COMPLETED = 'followup completed'

  STATUSES_COMPLETED = [STUDY_COMPLETED, DROPPED_OUT, FOLLOWUP_COMPLETED].freeze

  scope :completed, -> { where(status: STATUSES_COMPLETED) }

  validates :pin, length: { is: 6 }

  before_validation { assign_pin! if pin.blank? }

  def as_json(options = {})
    attrs = attributes.dup

    if Current.user.participant?
      attrs['name'] = "#{participant.first_name} #{participant.last_name}"
      attrs['email'] = participant.email
    else
      attrs['name'] = participant.codename
    end

    super.merge(attrs)
  end

  private

  def assign_pin!
    self.pin = PinGenerator.new.pin
  end
end
