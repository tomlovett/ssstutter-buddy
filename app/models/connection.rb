# frozen_string_literal: true

class Connection < ApplicationRecord
  belongs_to :participant
  belongs_to :study

  INVITATION_REJECTED = 'invitation rejected'
  STUDY_COMPLETED = 'study_completed'
  DROPPED_OUT = 'dropped out'
  FOLLOWUP_COMPLETED = 'followup_completed'
  INVITED = 'invited'
  INVITATION_ACCEPTED = 'invitation accepted'
  INTERESTED = 'interested'
  STUDY_BEGAN = 'study began'
  STUDY_INCOMPLETE = 'study incomplete'

  COMPLETED_STATUSES = [INVITATION_REJECTED, STUDY_COMPLETED, DROPPED_OUT, FOLLOWUP_COMPLETED].freeze
  IN_PROGRESS_STATUSES = [INVITED, INVITATION_ACCEPTED, INTERESTED, STUDY_BEGAN, STUDY_INCOMPLETE].freeze
  STATUSES = [
    INVITATION_REJECTED, STUDY_COMPLETED, DROPPED_OUT, FOLLOWUP_COMPLETED,
    INVITED, INVITATION_ACCEPTED, INTERESTED, STUDY_BEGAN, STUDY_INCOMPLETE
  ].freeze

  scope :invited, -> { where(status: INVITED) }
  scope :completed, -> { where(status: COMPLETED_STATUSES) }
  scope :active, -> { where(status: IN_PROGRESS_STATUSES) }

  validates :pin, length: { is: 6 }

  before_validation { assign_pin! if pin.blank? }

  private

  def assign_pin!
    self.pin = PinGenerator.new.pin
  end
end
