# frozen_string_literal: true

class Participant < ApplicationRecord
  belongs_to :user
  has_many :study_participations, dependent: nil

  delegate :first_name, :last_name, :email, to: :user
end
