# frozen_string_literal: true

class Researcher < ApplicationRecord
  belongs_to :user
  has_many :study, primary_key: :primary_researcher_id, dependent: nil

  delegate :first_name, :last_name, :full_name, :email, to: :user

  def professional_name
    titles.present? ? "#{full_name}, #{titles}" : full_name
  end
end
