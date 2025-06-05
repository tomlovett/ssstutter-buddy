# frozen_string_literal: true

class Connection < ApplicationRecord
  belongs_to :participant
  belongs_to :study
  has_one :researcher, through: :study

  # Invitation statuses
  INVITED = 'invited'
  ACCEPTED = 'accepted'
  DECLINED = 'declined'
  INTERESTED = 'interested'
  NOT_INTERESTED = 'not interested'

  # Study statuses
  CONNECTED = 'connected'
  STUDY_BEGAN = 'study began'
  STUDY_COMPLETED = 'study completed'
  ON_HOLD = 'on hold'
  DROPPED_OUT = 'dropped out'
  FOLLOWUP_COMPLETED = 'followup completed'

  STATUSES_COMPLETED = [STUDY_COMPLETED, DROPPED_OUT, FOLLOWUP_COMPLETED].freeze

  scope :invited, -> { where(invitation_status: INVITED) }
  scope :accepted, -> { where(invitation_status: [ACCEPTED, INTERESTED]) }
  scope :declined, -> { where(invitation_status: [DECLINED, NOT_INTERESTED]) }
  scope :completed, -> { where(study_status: STATUSES_COMPLETED) }

  validates :pin, length: { is: 6 }

  before_validation { assign_pin! if pin.blank? }

  def display_participant_name?
    [ACCEPTED, INTERESTED].include?(invitation_status)
  end

  def as_json(options = {})
    attrs = attributes.dup

    if display_participant_name?
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
