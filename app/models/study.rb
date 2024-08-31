# frozen_string_literal: true

class Study < ApplicationRecord
  belongs_to :primary_researcher, class_name: 'Researcher'
  has_many :study_participations, dependent: nil

  def timeline
    "#{total_hours} over #{total_sessions} over the course of #{duration}"
  end
end
