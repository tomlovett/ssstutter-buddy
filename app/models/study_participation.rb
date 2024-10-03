# frozen_string_literal: true

class StudyParticipation < ApplicationRecord
  belongs_to :participant
  belongs_to :study

  scope :invited, -> { where.not(invited: nil) }
  scope :completed, -> { where(completed: true) }
end
