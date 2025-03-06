# frozen_string_literal: true

class Connection < ApplicationRecord
  belongs_to :participant
  belongs_to :study

  INTERESTED = 'interested'
  INVITED = 'invited'
  INVITATION_ACCEPTED = 'invitation accepted'
  INVITATION_REJECTED = 'invitation rejected'
  REJECTED = 'rejected'
  STUDY_BEGAN = 'study began'
  STUDY_INCOMPLETE = 'study incomplete'
  STUDY_COMPLETED = 'study_completed'
  DROPPED_OUT = 'dropped out'
  FOLLOWUP_COMPLETED = 'followup_completed'

  STATUSES_COMPLETED = [INVITATION_REJECTED, REJECTED, STUDY_COMPLETED, DROPPED_OUT, FOLLOWUP_COMPLETED].freeze
  STATUSES_IN_PROGRESS = [INVITED, INVITATION_ACCEPTED, INTERESTED, STUDY_BEGAN, STUDY_INCOMPLETE].freeze
  STATUSES = [
    INVITATION_REJECTED, STUDY_COMPLETED, DROPPED_OUT, FOLLOWUP_COMPLETED,
    INVITED, INVITATION_ACCEPTED, INTERESTED, STUDY_BEGAN, STUDY_INCOMPLETE
  ].freeze

  scope :invited, -> { where(status: INVITED) }
  scope :completed, -> { where(status: STATUSES_COMPLETED) }
  scope :active, -> { where(status: STATUSES_IN_PROGRESS) }

  validates :pin, length: { is: 6 }

  before_validation { assign_pin! if pin.blank? }

  def display_participant_name?
    [INVITED, INVITATION_REJECTED].exclude?(status)
  end

  private

  def assign_pin!
    self.pin = PinGenerator.new.pin
  end
end
