# frozen_string_literal: true

class Researcher < ApplicationRecord
  belongs_to :user
  has_many :study, primary_key: :primary_researcher_id, dependent: nil

  delegate :first_name, :last_name, :email, to: :user
end
