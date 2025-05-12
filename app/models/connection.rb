# frozen_string_literal: true

class Connection < ApplicationRecord
  belongs_to :participant
  belongs_to :study
  has_one :researcher, through: :study

  INTERESTED = 'interested'
  NOT_INTERESTED = 'not interested'
  INVITED = 'invited'
  INVITATION_ACCEPTED = 'invitation accepted'
  INVITATION_DECLINED = 'invitation declined'
  STUDY_BEGAN = 'study began'
  STUDY_COMPLETED = 'study completed'
  DROPPED_OUT = 'dropped out'
  FOLLOWUP_COMPLETED = 'followup completed'
  # hidden -- remote-people

  STATUSES_COMPLETED = [INVITATION_DECLINED, NOT_INTERESTED, STUDY_COMPLETED, DROPPED_OUT, FOLLOWUP_COMPLETED].freeze
  STATUSES_IN_PROGRESS = [INVITATION_ACCEPTED, INTERESTED, STUDY_BEGAN].freeze
  STATUSES = [
    INVITATION_DECLINED, STUDY_COMPLETED, DROPPED_OUT, FOLLOWUP_COMPLETED,
    INVITED, INVITATION_ACCEPTED, INTERESTED, STUDY_BEGAN
  ].freeze

  scope :invited, -> { where(status: INVITED) }
  scope :accepted, -> { where(status: [INVITATION_ACCEPTED, INTERESTED]) }
  scope :declined, -> { where(status: INVITATION_DECLINED) }
  scope :completed, -> { where(status: STATUSES_COMPLETED) }
  scope :active, -> { where(status: STUDY_BEGAN) }
  scope :rejected, -> { where(status: [INVITATION_DECLINED, NOT_INTERESTED]) }
  scope :not_rejected, -> { where.not(status: [INVITATION_DECLINED, NOT_INTERESTED]) }

  validates :pin, length: { is: 6 }

  before_validation { assign_pin! if pin.blank? }

  def display_participant_name?
    [INVITED, NOT_INTERESTED, INVITATION_DECLINED].exclude?(status)
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
