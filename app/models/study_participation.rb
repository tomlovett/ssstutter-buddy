# frozen_string_literal: true

class StudyParticipation < ApplicationRecord
  belongs_to :participant
  belongs_to :study
end
